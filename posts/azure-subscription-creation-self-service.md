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
 
I often see customers struggle to scale when it comes to the task of creating Azure Subscriptions. This is one of the reasons why I developed a small Azure Function in combination with the Microsoft Power Automate and as well as Microsoft Forms. I want to show a way on how to enable the creation of Azure Subscriptions with self service in mind, whist also leveraging concepts/frameworks like Enterprise-Scale<sup id="a1">[1](#f1)</sup> or others<sup id="a2">[2](#f2)</sup> in the backend.   
 
# Prerequisites 
The solution is based on three different services that work across the multiple Microsoft clouds. This allows a quite seamless integration between the user input and the technical implementation. The services used are:   
   
1. Microsoft Forms
2. Microsoft Power Automate 
3. Azure Functions
 
In the next couple of paragraphs we will dive deeper into the different services and how to configure them. 
 
## Microsoft Form 
To enable the self-service of subscription creation we need to have some sort of Input mask that we can use to get some general data from the requestor. One of the easiest options is to go ahead and use Microsoft Forms for this use case. Using https://forms.office.com/ you can easily create a from by like the one you see below: 
 
![MS Forms](/img/Forms1.PNG)
 
The form itself can easily be shared and customized to meet your questions and requirements. Additionally it has already an integration with Azure (AD) and therefore, the requestor can be identified quite easily. For my questionnaire/form I chose the following questions: 
 
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
 
This minimal set of questions asked are needed to have a general understanding of the use case. Additionally those questions are needed to decide to which management group the created subscription should be moved. 
 
> Please be sure, that you share the Microsoft Form only within your company and *not* make it public! 
 
## Power Automate
 
After the questionnaire/form has been created, we need to integrate it with the Power Automate in order to create a workflow that triggers the function whenever a response is being created. This integration needs a minimum of three steps. 
 
1. Get/Read the created Forms response 
2. Get response details 
3. Execute a HTTP trigger 
 
The final result should look something like this: 
 
![PowerAutomate](/img/PowerPlatform1.png)
 
The first step is quite easy, we just need to connect to the Microsoft Forms service and choose the form that we have created beforehand. The action or initial trigger is called ```When a new response is submitted```. After this step, we need to get the detailed responses from the requestor, this can be achieved using the action ```Get response details```. In this step we can publish the detailed responses into the next action using ```Response Id```.
 
Eventually, we need to send the detailed responses in a JSON format to the Azure function using the ```HTTP``` action. (Be aware that you need *Power Automate Premium*<sup id="a3">[3](#f3)</sup> for this action. To call the function we can use different methods of authentication, I chose a rather simple one by using a created *Function Key* in the URI field. The ```body``` of the HTTP request should be formatted like a JSON document in order to function properly: 
 
>{
> "costcenter": "@{outputs('Get_response_details')?['body/rd43742f58a6945a5833a8140a8c6a07f']}",
>  "compliance": "@{outputs('Get_response_details')?['body/r3f5e95d4fa0d476a9dc71f90c1ba10f7']}",
>  "environment": "@{outputs('Get_response_details')?['body/r477d171f09854617a46bafe6e1fe31ce']}",
>  "managedby": "@{outputs('Get_response_details')?['body/r36caba56e4954176af8f5a47ffae9f89']}",
>  "projectname": "@{outputs('Get_response_details')?['body/r77e98d66187c42e0a85bbcd4a830fbb1']}",
> "criticality": "@{outputs('Get_response_details')?['body/r81e76dab7d494e00b350d3282c300b8d']}",
>  "confidentiality": "@{outputs('Get_response_details')?['body/r4a44db97a10d479c86bae58cb09824ec']}",
>  "msdn": "@{outputs('Get_response_details')?['body/r9073f32b4b384d949159fe521f5045d1']}",
>  "partner": "@{outputs('Get_response_details')?['body/r081532d229bc44a3b13b2fc1c68ca1ac']}",
>  "owner": "@{outputs('Get_response_details')?['body/responder']}"
>}
 
The last call/request runs as long as the function runs and will be successful, if the function provides a positive status code like: ```HTTP 200``` at the end of the execution (Which is does by default).  
 
### Possible Improvements 
 
To additionally approve the Integration/Workflow and make it more Enterprise ready there are some points to quite easily improve this MVP. Out of my head there are two major points that can be implemented quite quickly.  
 
1. Approval Workflow 
In order to allow a minimum set of Governance, an Approval workflow might be needed to serve as a gatekeeper. This can be configured similar to this: 
![Approval](/img/Approval1.PNG)
 
Furthermore, you could branch actions when the requestor wants a Sandbox Subscription, to create the subscription straight away without the need for an approval. 
Find more information about how to create an approval action/workflow here: https://docs.microsoft.com/en-us/power-automate/create-approval-response-options
 
1. Welcome or getting started Mail
To allow a smooth onboarding of the requestor a welcome or getting started mail is quite useful. This allows the requestor to quickly know how to work with Azure in the context of the company. This mail can be created quite easily, either by using the Outlook/Exchange Action or via Sendgrid (Used in this example). 
 
![PowerAutomate](/img/Email1.PNG)
 
## Azure Function
 
In order for the Azure Function to work, the following (additional) prerequisites/requirements need to be met: 
 
1. You must have an Owner role on an Enrollment Account to create a subscription
 
This is a "One Time Task" and you must grant access to create Azure Enterprise subscriptions to the Managed Service Identity/Service Principal (using the object ID) of the Azure Function. The easiest way (IMHO) is to use a Managed Service Identity with the function and assign the permission to it. For more detailed steps on how to do it, see: https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/grant-access-to-create-subscription?tabs=azure-powershell%2Cazure-powershell-2
 
2. Management Groups (that will be leveraged in the Function) need to exist! 
Since we want to make additional decisions based on the response details and not only create a subscription, The Management Group and Subscription Hierarchy need to be in place. Your Management Group hierarchy might vary, but you can easily customize the function to work with your hierarchy.
 
The main function itself is depicted below: 
 
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
 
# Move subscription to correlating Management Group for further bootstrapping (either using Enterprise Scale or Azure Blueprint)
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
 
The complete function can be found and forked/cloned here: https://github.com/lpassig/SubscriptionCreation 
 
# Final Thoughts
 
Using the Microsoft cloud services you can easily create a self service portal for your company to create Azure subscription. Additionally, you can download and analyze the input data on the Forms quite easy:    
 
![Overview](/img/FromOverview1.PNG)
 
However, this approach has also its limits and if you have a service management tool in place you might want to use this one instead to implement the workflow.    
 
Let me know what you think!
 
Cheers!
 
## Sources
<b id="f1">1</b> Enterprise Scale (https://github.com/Azure/Enterprise-Scale) [↩](#a1)
 
<b id="f2">2</b> Azure Spoke Blueprint (https://github.com/lpassig/AzureSpokeBlueprint/) [↩](#a2)
 
<b id="f3">3</b> MS Power Automate Pricing (https://flow.microsoft.com/en-us/pricing/) [↩](#a3)
 
 
 
---
 
> :ToCPrevNext
 