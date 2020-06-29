> :Hero src=https://source.unsplash.com/5fNmWej4tAA/1900x600,
>       mode=light,
>       target=desktop,
>       leak=216px

> :Hero src=https://source.unsplash.com/5fNmWej4tAA/1200x600,
>       mode=light,
>       target=mobile,
>       leak=96px

> :Hero src=https://source.unsplash.com/5fNmWej4tAA/1900x600,
>       mode=dark,
>       target=desktop,
>       leak=216px

> :Hero src=https://source.unsplash.com/5fNmWej4tAA/1200x600,
>       mode=dark,
>       target=mobile,
>       leak=96px

> :Title shadow=0 0 8px black, color=white
>
> Pillars of Well-Architected Azure Workloads!

> :Author src=github

<br>

When you are designing solutions or workloads in Azure it is quite common to make mistakes and not follow best practices throughout the whole process. Meaning, you will probably end up with a working solution, but there will be room for improvement. To tackle these issues, Microsoft came up with the Azure Well-Architected Framework. 

# Microsoft Azure Well-Architected Framework
The Azure Well-Architected Framework is a set of guiding principles, recommendations and approaches that can be used to improve the quality of your  workload. The framework consists of five pillars of architecture excellence: Cost Optimization, Operational Excellence, Performance Efficiency, Reliability, and Security.

## Cost Optimization
As a wrote already in one of my [previous blog posts](https://lennart.coding.blog/successful-cloud-adoption-primer), transparency and especially cost transparency is crucial when building a solution in the cloud. The idea of becoming a Profit Center instead of a Cost Center is quite important. 

**<center><blockquote>Managing costs to maximize the value delivered!</center></blockquote>**

Applying principles like **Build-Measure-Learn**, to accelerate your time to market while avoiding capital-intensive solutions, is only one of of many other tips and tricks that the framework offers.

Find more information [here](https://docs.microsoft.com/en-us/azure/architecture/framework/cost/overview) !

## Operational Excellence
Processes and procedures that are optimized for cloud computing and help you keeping your application running in production is a key element as well.  

**<center><blockquote>Operations processes that keep a system running in production!</center></blockquote>**

Some of the most crucial operational excellence disciplines are **Infrastructure provisioning** or otherwise frequently known as "Automation" or "Infrastructure as code". This discipline refers to best practices for deploying the platform where your application will run on

Find more information [here](https://docs.microsoft.com/en-us/azure/architecture/framework/devops/overview) !

## Performance Efficiency
Performance Efficiency is the ability of your workload to scale to meet the demands placed on it by users in an efficient manner. The main ways to achieve this are by **using scaling** appropriately and **implementing PaaS offerings** that have scaling built in.

**<center><blockquote>The ability of a system to adapt to changes in load!</center></blockquote>**

Designing solutions to *horizontal scale* (scaling out) instead of vertical scaling (scaling up) is one of many best practices to increase the performance while being efficient. 

Find more information [here](https://docs.microsoft.com/en-us/azure/architecture/framework/scalability/overview) !

## Reliability
In the cloud, we acknowledge up front that failures will happen. Instead of trying to prevent failures altogether, the goal is to minimize the effects of a single failing component.

**<center><blockquote>The ability of a system to recover from failures and continue to function!</center></blockquote>**

You want to achieve *High Resiliency* by recovering gracefully from failures and continue to function with minimal downtime and data loss before full recovery is a major target of every cloud solution. *High availability* (HA) is another dominant factor you want to reach, by running as designed in a healthy state with no significant downtime.

Find more information [here](https://docs.microsoft.com/en-us/azure/architecture/framework/resiliency/overview) !

## Security
Security is not only something that concerns the CISO and the IT Security folks but also developers and architects should be aware of it and even embrace it! Designing a secure solution is nowadays equally important to designing a reliable, modern and performant solution.   

**<center><blockquote>Protecting applications and data from threats!</center></blockquote>**

Losing security assurances like: confidentiality, integrity, and availability can negatively impact your business operations and revenue, as well as your organization’s reputation in the marketplace. Making Cyber-Security a top priority of every company. 

Find more information [here](https://docs.microsoft.com/en-us/azure/architecture/framework/security/overview) !

# Microsoft Azure Well-Architected Review

To easily examine your workload through the lenses of: reliability, cost management, operational excellence, security and performance efficiency a review assessment is available. Going through the whole assessment process takes about 20 minutes, if you choose to check your workload against all five pillars.

## Start the Assessment
Using [this link](https://docs.microsoft.com/en-us/assessments/?mode=pre-assessment&id=azure-architecture-review) your can start the assessment respectively the review process straight away! The review itself can be customized and configured according to your needs. 

![Azure Well Architected Start](/img/AWA_start.PNG)

You can give the assessment a name and choose one or more the categories of interest that you want to assess. Hereby reducing the time needed for the  assessment even more. 

## Questions and Answers

The questions as well as the answers can be quite detailed and can have multiple answers as seen below.

![Azure Well Architected Start](/img/AWA_OpEx.PNG)

 Since the questionaire has several questions and answers that can require certain domain knowlegde be sure you have the right stakeholders available that can answer those questions. The assessment was developed to assess most cloud based workload. However, they fit best if you have chosen a cloud native architecture.  

## Results and Recommendations  

After all questions have been answered a result is being created based on your replies. Depending on your answers you might end up with a result similar to the one below, rating my overall solution design *moderate*.   

![Azure Well Architected Start](/img/AWA_Recommend.PNG)

As seen in the picture above I might want to check the category of *Performance Efficiency* and *Reliability* to improve my workload further. By diving deeper into the categories, I get a good overview of the actions needed to improve my solution.  

![Azure Well Architected Start](/img/AWA_Improve.PNG)

The recommended actions above link to the Azure Architecture Center documentation, since the Well-Architected Framework is a part of this part of the documentation. Using the action links you can do a more targeted exploring of the content instead of loosely searching for best practices.  

# Closing
Visit the Microsoft Azure Well-Architected Framework [Landing page](https://docs.microsoft.com/en-us/azure/architecture/framework/) to generally explore the content and learn more about the goal of this framework. 

If you want to assess your workload you can do so by browsing the link [here](https://docs.microsoft.com/en-us/assessments/?mode=pre-assessment&id=azure-architecture-review), this allows you to only dig into the content that is relevant to you.

Back in May 2020 (at the Microsoft Build conference) the PM's of the Framework did a deep dive on the *Cost Optimization* pillar. You can find the recording of this session [here](https://channel9.msdn.com/Events/Build/2020/INT119) !

If you are in the beginning of your cloud journey try out the [Cloud Journey Tracker](https://docs.microsoft.com/en-us/assessments/?id=cloud-journey-tracker) tool and see what kind of things are missing e.g. in your cloud strategy. 

Let me know what you think about the tools and whether you would use them!

Cheers!

---

> :ToCPrevNext