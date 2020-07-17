> :Hero src=https://source.unsplash.com/MJSFNZ8BAXw/1900x600,
>       mode=light,
>       target=desktop,
>       leak=206px
 
> :Hero src=https://source.unsplash.com/MJSFNZ8BAXw/1200x600,
>       mode=light,
>       target=mobile,
>       leak=96px
 
> :Hero src=https://source.unsplash.com/MJSFNZ8BAXw/1900x600,
>       mode=dark,
>       target=desktop,
>       leak=206px
 
> :Hero src=https://source.unsplash.com/MJSFNZ8BAXw/1200x600,
>       mode=dark,
>       target=mobile,
>       leak=96px
 
> :Title shadow=0 0 8px black, color=white
>
> Azure Custom Cost Management Report
 
> :Author src=github
 
<br>
 
In this post I want to explain an Azure Function I developed. The Function itself was developed using PowerShell Core and is therefore executable on pretty much any modern operating system. My goal was it to develop a mechanism that sends a custom Cost Management Report for a subscription to an e-mail address. 
 
# The customer pain
While concepts like FinOps (https://www.finops.org/what-is-finops/) are getting more and more traction, there are is still the need of getting a detailed cost report via e-mail instead of using intelligent dashboards like PowerBi. This is why I came up with an Azure Function that tackles this problem by sending a custom cost report via e-mail.
 
The requirements I often here from customers are mostly one of the following: 
 
- "We want to get the current spend related to our budget on a weekly/monthly basis"
- "We need that information via mail since we don't look into any Portal/Dashboard"
- "We want to know, where we can optimize our current Azure spend"
 
Getting Cost Information via e-mail is more of an "Cost Control" approach rather than a "Cost Management" approach but since this is an already established an mature method we cannot ignore it. However, we can enhance the Cost Control information by: 
 
1. Splitting the costs in different categories like: Cost Center, Resource Group etc.  
2. Adding Cost Saving recommendations (From the Azure Advisor Service)  
 
This makes the information more actionable and therefore, paves the way to change from a Cost Control approach towards a Cost Management approach. 
 
# The solution
The solution is actually quite simple, if we do a little bit of digging and find the right query to get the needed information from the APIs. The whole solution is basically build on leveraging two APIs. 
 
## Azure Cost Management API
 
This is the tricky one. Since certain actions are not documented. But eventually I can up with this:
 
```
<#
# Get and Create Cost Management Report
#>
function Get-CostManagement($sub, $headers, $budgetname, $costCenterTag, $currency, $timeout) {
    $costManagementBody = @"
{
    "properties": {
        "currency": "$currency",
        "dateRange": "ThisMonth",
        "query": {
            "type": "ActualCost",
            "dataSet": {
                "granularity": "Daily",
                "aggregation": {
                    "totalCost": {
                        "name": "PreTaxCost",
                        "function": "Sum"
                    },
                    "totalCost$currency": {
                        "name": "PreTaxCost$currency",
                        "function": "Sum"
                    }
                },
                "sorting": [
                    {
                        "direction": "ascending",
                        "name": "UsageDate"
                    }
                ]
            },
            "timeframe": "None"
        },
        "chart": "Area",
        "accumulated": "true",
        "pivots": [
            {
                "type": "Dimension",
                "name": "ServiceName"
            },
            {
                "type": "TagKey",
                "name": "$costCenterTag"
            },
            {
                "type": "Dimension",
                "name": "ResourceGroupName"
            }
        ],
        "scope": "subscriptions/$sub",
        "kpis": [
            {
                "type": "Budget",
                "id": "subscriptions/$sub/providers/Microsoft.Consumption/budgets/$budgetname",
                "enabled": true
            },
            {
                "type": "Forecast",
                "enabled": false
            }
        ],
        "displayName": "Spending"
    }
}
"@
    $uriCostManagement = "https://management.azure.com/subscriptions/$sub/providers/Microsoft.CostManagement/views/render?api-version=2019-11-01"
    $response = Invoke-WebRequest -Uri $uriCostManagement -Method Post -Headers $headers -Body $costManagementBody -TimeoutSec $timeout
    $data = $Response.Content | ConvertFrom-Json
    $UrlDownloadpicture = $data.properties.imageUrl
    $webclient = New-Object System.Net.WebClient
    $imageBytes = $webClient.DownloadData($UrlDownloadpicture);
 
    $ImageBits = [System.Convert]::ToBase64String($imageBytes)
    ...
}
```
The tricky part is to find the "/views/render" action. I did find it  using the developer tools in the new MS Edge Browser, that is based on Chromium. I found the API action and the payload needed to create a PNG. I simply recreated the REST call by using the `Invoke-WebRequest` cmdlet and "voila" it worked! :)  
 
## Azure Advisor API
 
This is more straightforward since there is a good documentation on what we need to do. So first we need to generate recommendations and then we need to get the updated/created recommendations.
 
To generate recommendations we use the following function:
 
```
...
$uri = "https://management.azure.com/subscriptions/$sub/providers/Microsoft.Advisor/generateRecommendations?api-version=2017-03-31"
    Write-Debug ("POST {0}" -f $uri)
    $response = Invoke-WebRequest -Uri $uri -Method Post -Headers $headers
    $statusuri = New-Object System.Uri($response.Headers.Location)
    Write-Debug ("GET {0}" -f $statusUri)
    $secondsElapsed = 0
    while ($secondsElapsed -lt $timeout) {
        $response = Invoke-WebRequest -Uri $statusUri -Method Get -Headers $headers
        if ($response.StatusCode -eq 204) { break }
        Write-Host ("Waiting for generation to complete for subscription {0}..." -f $sub)
        Start-Sleep -Seconds 1
        $secondsElapsed++
    }
    $result = New-Object PSObject -Property @{"SubscriptionId" = $sub; "Status" = "Success"; "SecondsElapsed" = $secondsElapsed }
    if ($secondsElapsed -ge $timeout) {
        $result.Status = "Timed out"
    }
}
...     
```
The code above generates recommendations and waits until the recommendation creation is completed before continuing.    
 
To get Advisor Recommendations we can use the following URI: 
 
```
...
$AdvisorRecommendationsUri = "https://management.azure.com/subscriptions/$sub/providers/Microsoft.Advisor/recommendations?api-version=2017-04-19"
    $result = "letscheck"
    try {
        $AdvisorRecommendationsResult = Invoke-WebRequest -Uri $AdvisorRecommendationsUri -Method Get -Headers $headers
    }   
    catch {
        $result = ($_.ErrorDetails.Message | ConvertFrom-Json).error.code
    }
...
```
 
## The result 
 
If everything works out and all the prerequisites (find them in the the `run.ps1` file) the resulting e-mail that is sent, should look something like this: 
 
![CostManagementFunction](/img/CostManagementFunction.jpg)
 
## the deployment
 
It's quite straight forward: 
 
1. Clone the Git repository (https://github.com/lpassig/CostManagementFunction)
2. Open VSCode with the Azure Function Extention installed (https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
3. Sign in to your Azure Account by clicking "Sign in to Azure..." in the Azure Functions explorer
4. Create a new Azure Function and deploy the the content of the Github repository 
 
That's about it :) !
 
# The alternatives
 
If you are more mature in you FinOps journey and want to drill into data straigh away, you can have a look at a couple of projects from my colleagues. 
The first one is from Helder Pinto, he blogs on the techcommunity<sup id="a1">[1](#f1)</sup> regarding his Optimization Engine project on Github<sup id="a2">[2](#f2)</sup>.   
 
![OptimizationEngine](/img/OptimizationEngine.jpg)
 
The second option is a project from our consulting services colleaugs that published one of their projects<sup id="a3">[3](#a3)</sup> called the "Continuous Cloud Optimization Power BI Dashboards Project" 
 
![Continuous Cloud Optimization Power BI Dashboards](/img/CCODashboardOverviewImage.png)
 
# Closing 
 
Developing this solution as well as writing this blog post was quite "quick and dirty" so if there are issues feel free to create an I in the github repository (https://github.com/lpassig/CostManagementFunction) and as always. Let me know what you think! 
 
## Sources
<b id="f1">1</b> Techcommunity blog post from Helder Pinto (https://techcommunity.microsoft.com/t5/core-infrastructure-and-security/augmenting-azure-advisor-cost-recommendations-for-automated/ba-p/1339298) [↩](#a1)
 
<b id="f2">2</b> Helder Pinto's Github repository (https://github.com/helderpinto/AzureOptimizationEngine) [↩](#a2)
 
<b id="f3">3</b> Continuous Cloud Optimization Power BI Dashboards Project (https://github.com/Azure/ccodashboard) [↩](#a3)
 
---
 
> :ToCPrevNext
 