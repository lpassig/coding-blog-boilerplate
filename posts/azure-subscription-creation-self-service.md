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

## Power Powerplatform
 
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



All of a sudden, motivations like the ones listed below became far more popular:
 
- Scaling to meet market demands
- Scaling to meet geographic demands
- Preparation for new technical capabilities
 
The need for companies to scale IT without the employees being onsite or in the office, grew massively! The business functions needed to continue as usual and became way more important. Meaning *Business Continuity* was and still is a top priority for CEO's and CIO's alike. 
 
Applications and processes needed to work from the employees home, however German companies were not really prepared for this as a survey from Bitkom suggests. They found out that in 2018 only four in ten companies even offered the possibility of doing home office.
 
![HomeOffice](/img/Homeoffice_Germany.png)
Title: *Four out of ten companies rely on home office*
 
All these new requirements forced the adoption and usage of cloud technologies throughout the bench! Let it be to allow collaboration within the company or by using cloud to  transform applications to make them accessible from home.
 
# Time to move to the cloud?
 
So is it still a wise decision to move application or even whole datacenters into the cloud? 

The short answer: Absolutely! 
 
For several customers the health crisis even increased their willingness to move workload into the cloud: 
 
>Adopting and scaling via cloud based services, confirmed their cloud strategy. The cloud allowed them to maintain *Business Continuity* whilst scaling massively in the backend. Something they couldn't have achieved On-Premise.
 
<center>The "new normal" requires a mixture of both types of cloud computing motivations: 
</center>

**<center><blockquote>Innovation and cost savings!</center></blockquote>**

There is an interesting article on that, with the headline *With Innovation out of the Crisis* <sup id="a2">[2](#f2)</sup>. In this article the CIO of ZF (The world's fifth largest automotive supplier and leading manufacturer of drive, chassis and safety technology) explains among other things how: 
 
>"... the IT becomes the "*Field Enabler*" and provides for example the development platforms".
 
Microsoft also recognized the current challenges and just recently published two blog articles on those topics: 
 
1. **Optimize your Azure costs to help meet your financial objectives** 
   
   https://azure.microsoft.com/de-de/blog/optimize-your-azure-costs-to-help-meet-your-financial-objectives/ 
   
2. **Seven ways to achieve cost savings and deliver efficiencies with Azure infrastructure**
    
    https://azure.microsoft.com/de-de/blog/seven-ways-to-achieve-cost-savings-and-deliver-efficiencies-with-azure-infrastructure/ 
 
If you want to know options on how to be become both: Innovative and cost efficient, whilst surviving the recession let's shave a chat and discuss.

Let me know what you think!
 
Cheers!

## Sources
<b id="f1">1</b> Enterprise Scale (https://github.com/Azure/Enterprise-Scale) [↩](#a1)

<b id="f2">2</b> Azure Spoke Blueprint (https://github.com/lpassig/AzureSpokeBlueprint/) [↩](#a1)

<b id="f2">2</b> Mit Innovation aus der Krise (https://www.cio.de/a/mit-innovationen-aus-der-krise,3600303) [↩](#a2)



---

> :ToCPrevNext
