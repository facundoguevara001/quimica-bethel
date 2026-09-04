param([string]$Workbook,[string]$PlanPath)
$ErrorActionPreference='Stop';$up=-4162;$e=$null;$b=$null
try {
  $p=Get-Content -Raw -Encoding UTF8 $PlanPath|ConvertFrom-Json
  $e=New-Object -ComObject Excel.Application;$e.Visible=$false;$e.DisplayAlerts=$false;$b=$e.Workbooks.Open($Workbook)
  function NR($s,$c){$s.Cells($s.Rows.Count,$c).End($up).Row+1};function CopyCells($s,$f,$t){$s.Range($f).Copy($s.Range($t))};function SetCellValue($s,$cell,$x){$s.Range($cell).Value2=$x}
  $cat=$b.Worksheets.Item(3)
  if($p.newCategory){$r=[int]($p.category.code.Substring(4))+5;CopyCells $cat "A$($r-1):D$($r-1)" "A$r";SetCellValue $cat "B$r" $p.category.name;SetCellValue $cat "C$r" 'Activo'}
  if($p.newSubcategory){$r=[int]($p.subcategory.code.Substring(4))+5;CopyCells $cat "F$($r-1):J$($r-1)" "F$r";SetCellValue $cat "G$r" $p.category.code;SetCellValue $cat "H$r" $p.subcategory.name;SetCellValue $cat "I$r" 'Activo'}
  if($p.newContent){$r=[int]($p.content.code.Substring(4))+5;CopyCells $cat "L$($r-1):O$($r-1)" "L$r";SetCellValue $cat "M$r" 'Activo';SetCellValue $cat "N$r" $p.content.description;SetCellValue $cat "O$r" $p.content.characteristics}
  $s=$b.Worksheets.Item('PRODUCTOS');$r=NR $s 2;CopyCells $s "A$($r-1):U$($r-1)" "A$r";$x=@{A=$p.id;B=$p.code;C=$p.code;D=$p.group;E=$p.input.variant;F=$p.category.code;H=$p.subcategory.code;J=$p.input.brand;K=$p.input.product;L=$p.input.fragrance;M=$p.input.presentation;N="$($p.code).jpg";O=$p.content.code;R='';S='';T=$p.input.status;U='NO'};foreach($i in $x.GetEnumerator()){$s.Range("$($i.Key)$r").Value2=$i.Value}
  $s=$b.Worksheets.Item('PRECIOS');$r=NR $s 1;CopyCells $s "A$($r-1):L$($r-1)" "A$r";$packaging='NO';if($p.input.packaging -match '^S'){$packaging='SI'};$s.Cells($r,1).Value2=$p.code;$s.Cells($r,2).Value2=[double]$p.cost;$s.Cells($r,3).Value2=$packaging;$s.Cells($r,4).Value2=$p.pack
  $s=$b.Worksheets.Item('CONTROL_FOTOS');$r=NR $s 1;CopyCells $s "A$($r-1):H$($r-1)" "A$r";$x=@{A=$p.code;B=$p.input.product;C="$($p.code).jpg";D='PENDIENTE';E='';F='';G='PENDIENTE';H=''};foreach($i in $x.GetEnumerator()){$s.Range("$($i.Key)$r").Value2=$i.Value}
  $s=$b.Worksheets.Item('ALTA');$x=@{B24=$p.id;B25=$p.code;B26=$p.category.code;B27=$p.subcategory.code;B28=$p.content.code;B29="$($p.code).jpg";D24=$p.input.status;D25="Generador $($p.input.generator)";D26=$p.group;D27=$p.input.variant;D29=(Get-Date -Format 'dd/MM/yyyy')};foreach($i in $x.GetEnumerator()){$s.Range($i.Key).Value2=$i.Value}
  $b.ForceFullCalculation=$true;$b.Save()
} finally {if($b){$b.Close($true)};if($e){$e.Quit()}}
