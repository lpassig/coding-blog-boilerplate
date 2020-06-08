> :Hero src=https://source.unsplash.com/3fPXt37X6UQ/1900x600,
>       mode=light,
>       target=desktop,
>       leak=156px

> :Hero src=https://source.unsplash.com/3fPXt37X6UQ/1200x600,
>       mode=light,
>       target=mobile,
>       leak=96px

> :Hero src=https://source.unsplash.com/3fPXt37X6UQ/1900x600,
>       mode=dark,
>       target=desktop,
>       leak=156px

> :Hero src=https://source.unsplash.com/3fPXt37X6UQ/1200x600,
>       mode=dark,
>       target=mobile,
>       leak=96px

> :Title shadow=0 0 8px black, color=white
>
> Successful cloud adoption primer!

> :Author src=github

<br>

Whenever I help customers adopting the Azure cloud, I find myself talking about the same design principles all the time. So, I decided that in this article to share some of my thoughts. I want to discuss some of my major **design principles and practices** when talking about cloud computing adoption and making the cloud **enterprise ready**. Almost all those principles are not of technical nature per se, but they can be enforces/leverages by using technical tools. However, first and foremost my major hypothesis is that:

**<center><blockquote>The successful adoption of the cloud is all about company culture!</center></blockquote>**

# Shift Responsibilities
If you work or lead a centralized IT department be an enabler, rather than blocker or manual cloud custodian! Responsibilities can be shifted towards the Business Unit if wanted and needed. They think they can do it better?

**<center><blockquote>Give them the choice and let them try; Shift the responsibility!</center></blockquote>**

There are more than enough tasks you need to worry about! Maybe they can fulfill the requirements as good as you can if not you can help them. 😊

Depending on their needs you can either develop a default service that you want to offer (e.g. Centralized CI/CD Platform) or introduce/position yourself as an internal consulting department that helps them e.g. introduce their own tool or e.g. fulfilling the needed security requirements!

So, if you do go ahead with such a plan, introduce at least three types of maturities or operation models that you want to support within your enterprise:

1. **AppOps** - Application Team mostly works with 3rd party software or IaaS only components and still needs somebody that “installs the Security Updates” and manages other aspects of the operating system.

    *For example: SAP-Operations*

2. **DevOps** - Application team uses modern deployment and management tools to develop and enhance their product. 

    *For example: Azure Kubernetes Service (AKS)*

3. **SandBox** - Developer wants to experiment and qualify an Idea/PoC     
    
    *For example: Try out Azure Webapps for company website*

For each type described above, you offer different levels of services depending on the needs of the target group as already mentioned before. Some might just need an Enterprise Ready Subscription, while others need more support!  

# Drive Security
Having introduced those different types of cloud maturities, you need to define proper guardrails for each maturity grade. There should be a different set of default security measures for each of them. Find the right balance between security by default and keep in mind:

**<center><blockquote>Enforce where needed, audit/trust when appropriate</center></blockquote>**

Leverage tools that give you quick wins: Configuring Azure Security Center (ASC) properly delivers you and your environment some valuable data that helps you review and improve your security posture. The idea is to start of slow, don’t “overdo” it; Instead introduce or offer products/services that helps complying with security requirements more easily. Remember to that you don’t have to introduce everything at once.

**<center><blockquote>People will find ways to go around your measures if they are to strict!</center></blockquote>**

Creating an unsupervised account with their private/company credit card is done in minutes! Therefore, you want to find the right balance and help them onboarding security products as easy as possible.

A good segmetation strategy according to Mark Simos:  

1. **Enables Operations** – Minimizes operation friction by aligning to business practices and applications

2. **Contains Risk** - Adds cost and friction to attackers by
Isolating sensitive workloads from compromise of other assets
Isolating high exposure systems from being used as a pivot to other systems

3. **Is Monitored** – Security Operations should monitor for potential violations of the integrity of the segments (account usage, unexpected traffic, etc.)

# Enhance Transparency

One major opportunity that comes with cloud computing is the possibility to enhance the transparency throughout your IT driven enterprise. Financial questions like: How much is this business unit consuming can be answered quite easy for the IT! This allows you to: 

**<center><blockquote>Become a Profit Center instead of a Cost Center!**</center></blockquote>

Additionally, you can leverage Security/Compliance services that allow you to be improve your governance posture. But keep in mind when we talk about governance and compliance: 

**<center><blockquote>Compliant does not equal Secure; But it’s a start!</center></blockquote>**

Oversee your whole Azure Estate using Single plan of glass services like Azure Security Center (ASC) and Azure Policies to audit first (Enterprise wide): You can see how your defined guidelines and -rails are used respectively followed and eventually you can foresee where you need to improve or enforce!

# Encourage Sandboxing
You should experiment more and your company too! Proof of Concepts (PoC) are usually not expense in the cloud. Meaning if you or a business unit has an idea them try!

**<center><blockquote>Foster and Empower ideas rather than shutting them down</center></blockquote>**

Planning and proper testing is obviously still very relevant but what does it do any good if you have planned perfectly but it took 2 years? The cloud changes from day to day, whatever you wrote a year ago might not be applicable anymore…

**<center><blockquote>Introduce Proof of Concepts (PoC) in early stages!</center></blockquote>**

Let me give you another example: You can plan the Migration of a lot of VMs to Azure for years, but without proper experimenting or Proof of Concepts (PoC) early on, you or your team don’t learn valuables lessons on how to work within the cloud while planning the operations. Eventually too much analyzing while results in lower Motivation and eventually frustration.

# Use native tools
You should use native tools and aligned with Microsoft, to be sure your feedback is considered when releasing new features.

**<center><blockquote>New capabilities are swiftly available within your environments!</center></blockquote>**

Sure, sometimes it takes longer, sometimes it takes less time, but: Most of the times Azure provide a service change/Improve quite quick (remember Windows releases?) Choosing native services you might have to do some trade-offs when it comes to functionality, as not everything you want will be there on day one but Cloud Solution Architect, as myself, are there to help you use those products and help improve them by giving feedback to the product group that develops them.

**<center><blockquote>Experiment with services in Preview!</center></blockquote>**

They are mostly free of charge and using them and giving us feedback you can indirectly or in some cases directly influence the product roadmap!

# Closing
Are you interested in beginning your own cloud adoption journey and want to talk more in detail? Feel free to engage with me 😊 

Do you need an Enterprise-Ready Subscription Blueprint? Check out my Github repository: https://github.com/lpassig/AzureSpokeBlueprint 

Here I have published a blueprint that creates a fully functional spoke landing zone that can be provided by the central IT and used by business units.

Let me know what you think!

Cheers!

---

