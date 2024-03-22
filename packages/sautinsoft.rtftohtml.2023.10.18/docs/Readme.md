![Nuget](https://img.shields.io/nuget/v/sautinsoft.rtftohtml) ![Nuget](https://img.shields.io/nuget/dt/sautinsoft.rtftohtml) 
# .NET SDK to convert RTF, DOCX, Text to HTML

![rtf](https://camo.githubusercontent.com/bda56ed9c685aa63d9b07328b561f435b91dee56260cf7cc71ef343e5fbbba23/68747470733a2f2f6769746875622d70726f64756374696f6e2d757365722d61737365742d3632313064662e73332e616d617a6f6e6177732e636f6d2f37393833373936332f3233393136393932362d32643836633766342d346139362d343566312d616465622d3332663439633638363836662e706e67)

[SautinSoft.RtfToHtml](https://sautinsoft.com/products/rtf-to-html/) is .NET assembly to convert Text, RTF, DOCX to HTML. Provides your by API to transform Word documents to HTML5, 4.01, 3.2, XHTML with a lot of converting options.

## Quick links

+ [Developer Guide](https://sautinsoft.com/products/rtf-to-html/help/net/)
+ [API Reference](https://sautinsoft.com/products/rtf-to-html/help/net/api-reference/html/N_SautinSoft_RtfToHtml.htm)

## Top Features

+ [Convert RTF file to HTML file.](https://sautinsoft.com/products/rtf-to-html/help/net/developer-guide/convert-rtf-to-html-csharp-vb-net.php)
+ [Convert DOCX file to HTML file.](https://sautinsoft.com/products/rtf-to-html/help/net/developer-guide/convert-docx-to-html-csharp-vb-net.php)
+ [Convert Text file to HTML file.](https://sautinsoft.com/products/rtf-to-html/help/net/developer-guide/convert-text-to-html-csharp-vb-net.php)

## System Requirement

* .NET Framework 4.6.1 - 4.8.1
* .NET Core 2.0 - 3.1, .NET 5, 6, 7, 8
* .NET Standard 2.0
* Windows, Linux, macOS, Android, iOS.

## Getting Started with RTF to HTML .Net

Are you ready to give RTF to HTML .NET a try? Simply execute `Install-Package sautinsoft.rtftohtml` from Package Manager Console in Visual Studio to fetch the NuGet package. If you already have RTF to HTML .NET and want to upgrade the version, please execute `Update-Package sautinsoft.rtftohtml` to get the latest version.

## Convert RTF to HTML

```csharp
string inpFile = @"..\..\..\..\example.rtf";
string outfile = Path.GetFullPath("Result.html");
            
RtfToHtml r = new RtfToHtml();
r.Convert(inpFile, outfile, new HtmlFixedSaveOptions() {Title = "SautinSoft Example." });
```
## Convert DOCX to HTML

```csharp
string inpFile = @"..\..\..\..\example.docx";
string outfile = Path.GetFullPath("Result.html");
            
RtfToHtml r = new RtfToHtml();
r.Convert(inpFile, outfile, new HtmlFixedSaveOptions() {Title = "SautinSoft Example." });
```

## Convert Txt to HTML

```csharp
string inpFile = @"..\..\..\..\example.txt";
string outfile = Path.GetFullPath("Result.html");
            
RtfToHtml r = new RtfToHtml();
r.Convert(inpFile, outfile, new HtmlFixedSaveOptions() {Title = "SautinSoft Example." });

```

## Resources

+ **Website:** [www.sautinsoft.com](https://www.sautinsoft.com)
+ **Product Home:** [RTF to HTML .Net](https://sautinsoft.com/products/rtf-to-html/)
+ [Download SautinSoft.RtfToHtml](https://sautinsoft.com/products/rtf-to-html/download.php)
+ [Developer Guide](https://sautinsoft.com/products/rtf-to-html/help/net/)
+ [API Reference](https://sautinsoft.com/products/rtf-to-html/help/net/api-reference/html/N_SautinSoft_RtfToHtml.htm)
+ [Support Team](https://sautinsoft.com/support.php)
+ [License](https://sautinsoft.com/products/rtf-to-html/help/net/getting-started/agreement.php)
