# AJAX-EDB

AJAX-EDB is an UNOFFICIAL client-side search tool based on HTML, JavaScript and AJAX, which uses the data available in the Official [Exploit-DB GitHub repository](https://github.com/offensive-security/exploit-database) to search, filter and find exploits in a similar way that you would do in the official [Exploit-DB Website](https://www.exploit-db.com/).

Data is loaded once in your Browser. This means that all the queries you launch in the tool are offline, resulting in noticeably faster results. Moreover, CAPTCHAS are never needed, since there is no server behind the responses. If you want to drill-in an specific exploit, the links will redirect you to the details page at the official Website. The same rule applies for exploit and shellcode downloads.

Since the data comes from the Official Exploit-DB repository, you may expect it to be up to date with **1-day margin**. However, if you want to stay on the cutting edge, the official Website is the only way to go.

In short terms, you could consider this tool as an hybrid between the Exploit-DB official Website, and the official 'Searchsploit' command line tool.

## How to use

1. Go to https://albertov91.github.io/ajax-edb/

2. Wait for the tool to retrieve the data (it should take a few seconds only).

3. Make your queries in the search box. In the main page, you can also view the latest exploits loaded into the tool.

### Labels

Some shortcuts have been implemented in case you want to make a more detailed query. One of these are **Labels**, which allow you to search by a given attribute with the _label:value_ syntax. Currently, supported labels are: _platform_, _author_, and _filetype_.

Examples:

1. If you want to search an exploit for Apache which is compatible with the 'windows' platform, you can issue the following query:
`platform:windows apache`

2. If you are interested in all the exploits available for WordPress whose author is 'Metasploit', you can consult it with:
`author:metasploit wordpress`

3. If you want to gather all available PowerShell scripts in Exploit-DB, you can do it with the following query:
`filetype:ps1`

### Operands

Another kind of shortcut implemented in the tool are **Operands**. Currently, only the exclusion operand "-" is implemented. If you type the "-" character before any keyword, that keyword will be excluded from the search results.

For example, if you want all exploits available for WordPress whose author is 'Metasploit', but you don't want to retrieve results for plugins, you can specify it as follows: 
`author:metasploit wordpress -plugin`