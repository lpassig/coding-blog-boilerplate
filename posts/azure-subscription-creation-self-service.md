> :Hero src=https://source.unsplash.com/bq31L0jQAjU/1900x600,
>       mode=light,
>       target=desktop,
>       leak=206px

> :Hero src=https://source.unsplash.com/bq31L0jQAjU/1200x600,
>       mode=light,
>       target=mobile,
>       leak=96px

> :Hero src=https://source.unsplash.com/bq31L0jQAjU/1900x600,
>       mode=dark,
>       target=desktop,
>       leak=206px

> :Hero src=https://source.unsplash.com/bq31L0jQAjU/1200x600,
>       mode=dark,
>       target=mobile,
>       leak=96px

> :Title shadow=0 0 8px black, color=white
>
> Enable Self-Service Creation of Azure Subscriptions!

> :Author src=github

<br>

I often see customers struggle to scalewhen it comes to the task of creating Azure Subscriptions. This one of the reasons why I developed a small Azure Function in combination with the Microsoft Power Platfrom and as well as Microsoft Forms. I want to show a way on how to enable the creation of Azure Subscriptions with self service in mind, whist also leveraging concepts/frameworks like Enterprise-Scale<sup id="a1">[1](#f1)</sup> or others<sup id="a2">[2](#f2)</sup> in the backend.   
 
# The Prereqitisites 
The solution is based on three different services that work across the multiple Microsoft clouds. This allows a quite seamless integration between the user input and the technical implementation. The services used are:   
   
1. Microsoft Forms
2. Microsoft Power Platform 
3. Azure Functions

In the next couple of paragraphes we will dive deeper into the different services and how to configure them. 

## Microsoft Form 
To enable the self-service of subscription creation we need to have some sort of Input mask that we can use to get some general data from the requestor. One of the easiest options is to go ahead and use Microsoft Forms for this use case. Using https://forms.office.com/ you can easily create a from by like the one you see below: 

![Forms](/img/Forms1.png)

The form itself can easily be shared and and customized to meet your questions and requirements. Additionally it has already an integration with Azure (AD) and therefore, the requestor can be identified quite easily. For my questionaire/form I chose the following questions: 

> 1. Enter your Cost Center: 
>    <br>(Free Text)
> 2. Enter Project / Use Case / App Name: 
>    <br>(Free Text)
> 3. Enter Organization or Team Name: 
>    <br>(Free Text)
> 4. Choose the environment stage of your Project / Use Case / App: 
>    <br>(Choose)
>    <br>Production
>    <br>Testing
>    <br>Development
>    <br>Sandbox
> 5. Choose compliance requirement:
>    <br>(Choose)
>    <br>High (e.g. GDPR)
>    <br>Medium (e.g. ISO Compliance)
>    <br>Low (e.g. Corporate Compliance)
>    <br>None (e.g. Sandbox)
> 6. Choose the business criticality of your Project / Use Case / App:
>    <br>(Choose)
>    <br>High
>    <br>Medium
>    <br>Low
>    <br>None (e.g. Sandbox)
> 7. Choose the data confidentiality of your Project / Use Case / App:
>    <br>(Choose)
>    <br>High
>    <br>Medium
>    <br>Low
>    <br>None (e.g. Sandbox)
> 8. My Use Case or Application is Dev/Test related and all developers do have a valid MSDN licence
>    <br>(Choose)
>    <br>Yes
>    <br>No
> 9. Enter the name(s) of any helping external partner(s) (if exist): 
>    <br>(Free Text)
>

The created Microsoft form can be found and duplicated here:
<br>https://forms.office.com/Pages/ShareFormPage.aspx?id=yhBjFeK3GEShsVflrr9qJwRTHhnL69ROqdmQTMjmO9NUM1I0WUlJWEZIV0pRTEVaSFk4QkpZTlNNVC4u&sharetoken=rMxBljCWPjxop8s7hXyC

This minimal set of questions asked are needed to have a general understanding of the use case. Additionally they are needed to decide to which management group the created subscription should be moved. 

## Power Platform
 
After the questionaire/form has been created we need to integrate it with the Power Platform in order to create a workflow. This integration needs a minimum of three steps. 

1. Get/Read the created Forms response 
2. Get response details 
3. Excecute a HTTP trigger 

The final result should look something like this: 

![PowerPlatform](/img/PowerPlatform1.png)

The body should be formated like a JSON document: 
{
  "costcenter": "@{outputs('Get_response_details')?['body/rd43742f58a6945a5833a8140a8c6a07f']}",
  "compliance": "@{outputs('Get_response_details')?['body/r3f5e95d4fa0d476a9dc71f90c1ba10f7']}",
  "environment": "@{outputs('Get_response_details')?['body/r477d171f09854617a46bafe6e1fe31ce']}",
  "managedby": "@{outputs('Get_response_details')?['body/r36caba56e4954176af8f5a47ffae9f89']}",
  "projectname": "@{outputs('Get_response_details')?['body/r77e98d66187c42e0a85bbcd4a830fbb1']}",
  "criticality": "@{outputs('Get_response_details')?['body/r81e76dab7d494e00b350d3282c300b8d']}",
  "confidentiality": "@{outputs('Get_response_details')?['body/r4a44db97a10d479c86bae58cb09824ec']}",
  "msdn": "@{outputs('Get_response_details')?['body/r9073f32b4b384d949159fe521f5045d1']}",
  "partner": "@{outputs('Get_response_details')?['body/r081532d229bc44a3b13b2fc1c68ca1ac']}",
  "owner": "@{outputs('Get_response_details')?['body/responder']}"
}


## Azure Function

In order for the function to work, the following  

1. (One time Task): You must have an Owner role on an Enrollment Account to create a subscription: Grant access to create Azure Enterprise subscriptions to the Managed Service Identity/Service Principal (using the object ID) of the Azure Function See: https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/grant-access-to-create-subscription?tabs=azure-powershell%2Cazure-powershell-2

2. Management Groups (that will be leveraged in the Function) need to exists! 

3. Microsoft Forms and Power Automate need to exist and and properly configured for the Input data 

```
...
#
##
###    Create Azure Subscription for Bootstrapping 
##
#

[String]$ProjectName = $Request.Body.projectname.Replace(' ', '').ToLower()

If($Request.Body.environment -like "Production"){
    $Environment = "prod"
}
If($Request.Body.environment -like "Testing"){
    $Environment = "test"
}
If($Request.Body.environment -like "Development"){
    $Environment = "dev"
}
If($Request.Body.environment -like "Sandbox"){
    $Environment = "sbox"
}

# Build SubscriptionName
$SubscriptionName ="sub-$OrganizationName-$ProjectName-$Environment"

# Define Subscription Offer Type

    # MS-AZR-0017P for EA-Subscription
    # MS-AZR-0148P for Dev/Test Subscriptions (MSDN Licences needed)

If($Request.Body.msdn -like "No"){
    $OfferType = "MS-AZR-0017P"
}
else{
    $OfferType = "MS-AZR-0148P"
}

# Get Object ID of the Managed Service Identity/Service Principal  
$EnrollmentId = (Get-AzEnrollmentAccount).ObjectId

# Create Subscription 
$NewSubscription = New-AzSubscription -OfferType $OfferType -Name $SubscriptionName -EnrollmentAccountObjectId $EnrollmentId -OwnerSignInName $Request.Body.owner

# Wait for the subscription to be created 
Start-Sleep -Seconds 10

#Log Subscription Details
Write-Output "New subscription:" $NewSubscription | ConvertTo-Json | Write-Output

#
##
###    Move Azure Subscription to Management Group
##
#

# Get created subscription  

$consistent = $false
    $loops = 0

    while (-not $consistent) {
        $subscription = $null
        try {
            $Subscription = Get-AzSubscription -SubscriptionName $SubscriptionName
        }
        catch {
            $subscription = $null
            if ($loops -eq 30) {
                throw "Took too long for subscription to become consistent."
            }
            Write-Output "Loop: $loops"
            Start-Sleep -Seconds 1
        }
        if ($null -ne $subscription) {
            $consistent = $true
        }
        $loops++
    }

# Move subscription to correlating Management Group for further bootstrapping (either using Enterprise Scale or Azure Bluepint)
New-AzManagementGroupSubscription -GroupName $Environment -SubscriptionId $Subscription.Id

# Wait for the subscription to be moved 
Start-Sleep -Seconds 10

#
##
###    Define subscription tags
##
#

# Define Naming for Tags
$company_costcenter = "$OrganizationName"+"_costcenter"
$company_managedby = "$OrganizationName"+"_managedby"
$company_complianceLevel = "$OrganizationName"+"_complianceLevel"
$company_project_app_name =  "$OrganizationName"+"_project_app_name"
$company_subscription_requestor = "$OrganizationName"+"subscription_requestor"
$company_environment = "$OrganizationName"+"_environment"
$company_criticality = "$OrganizationName"+"_criticality"
$company_confidentiality = "$OrganizationName"+"_confidentiality"
$company_reviewdate = "$OrganizationName"+"_reviewdate"
$company_maintenancewindow =  "$OrganizationName"+"_maintenancewindow"
$company_external_partner = "$OrganizationName"+"_external_partner"

# Define Tag Table 
If($Request.Body.partner -like ""){
$tags = @{
    "$company_costcenter"=$Request.Body.costcenter;
    "$company_managedby"=$Request.Body.managedby;
    "$company_complianceLevel"=$Request.Body.compliance;
    "$company_project_app_name"=$Request.Body.projectname;
    "$company_subscription_requestor"=$Request.Body.owner
    "$company_environment"=$Request.Body.environment;
    "$company_criticality"=$Request.Body.criticality;
    "$company_confidentiality"=$Request.Body.confidentiality;
    "$company_reviewdate"="TBD";
    "$company_maintenancewindow"="TBD";
    }
}
else{
$tags = @{
    "$company_costcenter"=$Request.Body.costcenter;
    "$company_managedby"=$Request.Body.managedby;
    "$company_complianceLevel"=$Request.Body.compliance;
    "$company_project_app_name"=$Request.Body.projectname;
    "$company_subscription_requestor"=$Request.Body.owner
    "$company_environment"=$Request.Body.environment;
    "$company_criticality"=$Request.Body.criticality;
    "$company_confidentiality"=$Request.Body.confidentiality;
    "$company_reviewdate"="TBD";
    "$company_maintenancewindow"="TBD";
    "$company_external_partner"=$Request.Body.partner;
    }    
}

#
##
###    Assign initial subscription tags
##
#

$subid = $subscription.Id
# Assign Tags
New-AzTag -ResourceId "/subscriptions/$subid" -Tag $tags
...
```

The complete function can be found here: https://github.com/lpassig/SubscriptionCreation 

Let me know what you think!
 
Cheers!

## Sources
<b id="f1">1</b> Enterprise Scale (https://github.com/Azure/Enterprise-Scale) [↩](#a1)

<b id="f2">2</b> Azure Spoke Blueprint (https://github.com/lpassig/AzureSpokeBlueprint/) [↩](#a1)

<b id="f2">2</b> Mit Innovation aus der Krise (https://www.cio.de/a/mit-innovationen-aus-der-krise,3600303) [↩](#a2)



---

> :ToCPrevNext
