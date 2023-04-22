# delete nore_modules from a given directory

function xnm () {
[CmdletBinding()] 
Param (
    [Parameter(Mandatory=$true, HelpMessage="Please enter the path of project where node_modules is.", Position=0)]
    [ValidateScript({
            if( -Not ($_ | Test-Path) ){
                throw "folder does not exist"
            }
            return $true
        })
    ]
    [System.IO.FileInfo] $ProjectRootPath
)

BEGIN {
  $NM = "node_modules"
	Read-Host -Prompt "Press any key to continue to delete $NM or CTRL+C to quit"
}
PROCESS {
    $Path = Resolve-Path -Path $ProjectRootPath
		Write-Host "Deleting $NM from " -NoNewline
    Write-Host "$Path" -ForegroundColor Yellow
    if (Test-Path -Path "$Path/$NM") {
        Get-ChildItem -Path $Path -Include $NM -Recurse -Directory | Remove-Item -Recurse -Force
    } else {
        Write-Error "$NM folder does not exist." -ErrorAction Stop
    }
}

END {
    Write-Host "$NM deleted." 
}
}