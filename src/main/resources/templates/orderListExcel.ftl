<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Created>2006-09-13T11:21:51Z</Created>
  <LastSaved>2019-07-09T09:27:34Z</LastSaved>
  <Version>12.00</Version>
 </DocumentProperties>
 <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">
  <RemovePersonalInformation/>
 </OfficeDocumentSettings>
 <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
  <WindowHeight>11640</WindowHeight>
  <WindowWidth>19200</WindowWidth>
  <WindowTopX>0</WindowTopX>
  <WindowTopY>96</WindowTopY>
  <ActiveSheet>1</ActiveSheet>
  <ProtectStructure>False</ProtectStructure>
  <ProtectWindows>False</ProtectWindows>
 </ExcelWorkbook>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Borders/>
   <Font ss:FontName="宋体" x:CharSet="134" ss:Size="11" ss:Color="#000000"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="s16">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <NumberFormat ss:Format="@"/>
  </Style>
  <Style ss:ID="s64">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
  </Style>
  <Style ss:ID="s67">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="宋体" x:CharSet="134" ss:Size="11" ss:Color="#000000"
    ss:Bold="1"/>
   <NumberFormat ss:Format="@"/>
  </Style>
  <Style ss:ID="s73">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="宋体" x:CharSet="134" ss:Size="18" ss:Color="#000000"
    ss:Bold="1"/>
   <NumberFormat ss:Format="@"/>
  </Style>
  <Style ss:ID="s74">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="宋体" x:CharSet="134" ss:Size="11" ss:Color="#000000"
    ss:Bold="1"/>
   <NumberFormat ss:Format="@"/>
  </Style>
  <Style ss:ID="s75">
   <Font ss:FontName="宋体" x:CharSet="134" ss:Size="11" ss:Color="#000000"
    ss:Bold="1"/>
  </Style>
  <Style ss:ID="s78">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <NumberFormat ss:Format="General Date"/>
  </Style>
  <Style ss:ID="s81">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="宋体" x:CharSet="134" ss:Size="11" ss:Color="#000000"
    ss:Bold="1"/>
  </Style>
  <Style ss:ID="s82">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="宋体" x:CharSet="134" ss:Size="11" ss:Color="#000000"
    ss:Bold="1"/>
  </Style>
  <Style ss:ID="s85">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="宋体" x:CharSet="134" ss:Size="16" ss:Color="#000000"
    ss:Bold="1"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="订单明细">
  <Table ss:ExpandedColumnCount="20" ss:ExpandedRowCount="<#if sheetSize!=0>${sheetSize?if_exists+20}<#else>20</#if>" x:FullColumns="1"
   x:FullRows="1" ss:DefaultRowHeight="14.4">
   <Column ss:StyleID="s16" ss:AutoFitWidth="0" ss:Width="116.4"/>
   <Column ss:StyleID="s16" ss:AutoFitWidth="0" ss:Width="81"/>
   <Column ss:StyleID="s16" ss:AutoFitWidth="0" ss:Width="77.399999999999991"/>
   <Column ss:StyleID="s16" ss:AutoFitWidth="0" ss:Width="89.4"/>
   <Column ss:AutoFitWidth="0" ss:Width="166.2"/>
   <Column ss:AutoFitWidth="0" ss:Width="67.2"/>
   <Column ss:AutoFitWidth="0" ss:Width="67.2"/>
   <Column ss:AutoFitWidth="0" ss:Width="67.2"/>
   <Column ss:AutoFitWidth="0" ss:Width="64.2"/>
   <Column ss:AutoFitWidth="0" ss:Width="76.2"/>
   <Column ss:AutoFitWidth="0" ss:Width="67.2"/>
   <Column ss:AutoFitWidth="0" ss:Width="73.199999999999989"/>
   <Column ss:AutoFitWidth="0" ss:Width="95.399999999999991"/>
   <Column ss:AutoFitWidth="0" ss:Width="64.8"/>
   <Column ss:AutoFitWidth="0" ss:Width="64.8"/>
   <Column ss:AutoFitWidth="0" ss:Width="64.8"/>
   <Column ss:AutoFitWidth="0" ss:Width="64.8"/>
   <Row>
    <Cell ss:MergeAcross="11" ss:MergeDown="1" ss:StyleID="s73"><Data
      ss:Type="String">订单明细</Data></Cell>
   </Row>
   <Row ss:Index="3">
    <Cell ss:MergeAcross="11" ss:StyleID="s67"><Data ss:Type="String">查询时间（${startTime} ~ ${endTime}）</Data></Cell>
   </Row>
   <Row ss:StyleID="s75">
    <Cell ss:StyleID="s74"><Data ss:Type="String">订单号</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">昵称</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">员工姓名</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">员工手机</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">openid</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">订单总额</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">支付金额</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">折扣金额</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">支付状态</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">发货状态</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">订单来源</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">所属店铺</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">下单时间</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">收款人</Data></Cell>
     <Cell ss:StyleID="s74"><Data ss:Type="String">退款状态</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">退款时间</Data></Cell>
    <Cell ss:StyleID="s74"><Data ss:Type="String">退款人</Data></Cell>
   </Row>
<#list orderList as order>
   <Row ss:StyleID="s64">
    <Cell ss:StyleID="s16"><Data ss:Type="String">${order.orderNo?if_exists}</Data></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">${order.nick?if_exists}</Data></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">${order.employeeName?if_exists}</Data></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">${order.employeePhone?if_exists}</Data></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">${order.openid?if_exists}</Data></Cell>
    <Cell><Data ss:Type="String">${(order.totalAmount?string("0.##"))?if_exists}</Data></Cell>
    <Cell><Data ss:Type="String">${(order.payAmount?string("0.##"))?if_exists}</Data></Cell>
    <Cell><Data ss:Type="String">${(order.discountAmount?string("0.##"))?if_exists}</Data></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String"><#if (order.orderStatua == '0')>未支付<#elseif (order.orderStatua == '1')>已支付<#else></#if>
    </Data></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">
<#if (order.deliveryStatus == '0')>
未发货
<#elseif (order.deliveryStatus == '1')>
已发货
<#else>

</#if>
    </Data></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">
 <#if (order.orderSource == '0')>
二维码收款
<#elseif (order.orderSource == '1')>
接口收款
<#else>

</#if>
    </Data></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">${order.shopName?if_exists}</Data></Cell>
    <Cell ss:StyleID="s78"><Data ss:Type="String">${order.createTime?string("yyyy-MM-dd HH:mm:ss")}</Data></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">${order.saleName?if_exists}</Data></Cell>
     <Cell ss:StyleID="s16"><Data ss:Type="String"><#if (order.refudStatus?? && order.refudStatus == '0')>未退款<#elseif (order.refudStatus?? && order.refudStatus == '1')>已退款<#else>未退款</#if> </Data></Cell>
     <Cell ss:StyleID="s78"><Data ss:Type="String"><#if (order.refundTime??)>${order.refundTime?string("yyyy-MM-dd HH:mm:ss")}</#if></Data></Cell>
        <Cell ss:StyleID="s16"><Data ss:Type="String">${order.refudOrpator?if_exists}</Data></Cell>
   </Row>
   </#list>
  </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <PageSetup>
    <Header x:Margin="0.3"/>
    <Footer x:Margin="0.3"/>
    <PageMargins x:Bottom="0.75" x:Left="0.7" x:Right="0.7" x:Top="0.75"/>
   </PageSetup>
   <Print>
    <ValidPrinterInfo/>
    <PaperSizeIndex>9</PaperSizeIndex>
    <HorizontalResolution>200</HorizontalResolution>
    <VerticalResolution>200</VerticalResolution>
   </Print>
   <Panes>
    <Pane>
     <Number>3</Number>
     <ActiveRow>8</ActiveRow>
     <ActiveCol>3</ActiveCol>
    </Pane>
   </Panes>
   <ProtectObjects>False</ProtectObjects>
   <ProtectScenarios>False</ProtectScenarios>
  </WorksheetOptions>
 </Worksheet>
 <Worksheet ss:Name="汇总">
  <Table ss:ExpandedColumnCount="9" ss:ExpandedRowCount="<#if sheetSize!=0>${sheetSize2?if_exists+20}<#else>20</#if>" x:FullColumns="1"
   x:FullRows="1" ss:DefaultRowHeight="14.4">
   <Column ss:AutoFitWidth="0" ss:Width="95.399999999999991"/>
   <Column ss:AutoFitWidth="0" ss:Width="124.2"/>
   <Row>
    <Cell ss:MergeAcross="2" ss:MergeDown="1" ss:StyleID="s85"><Data
      ss:Type="String">汇总</Data></Cell>
   </Row>
   <Row ss:Index="3">
    <Cell ss:MergeAcross="1" ss:StyleID="s81"><Data ss:Type="String">总订单数</Data></Cell>
    <Cell ss:StyleID="s82"><Data ss:Type="String">${(sumTotal.orderCount?string("0.##"))!0}</Data></Cell>
    <Cell ss:StyleID="s64"/>
    <Cell ss:MergeAcross="1" ss:StyleID="s81"><Data ss:Type="String">退款总单数</Data></Cell>
    <Cell ss:StyleID="s82"><Data ss:Type="String">${(sumTotal.refundCount?string("0.##"))!0}</Data></Cell>
   </Row>
   <Row>
    <Cell ss:MergeAcross="1" ss:StyleID="s81"><Data ss:Type="String">订单总额</Data></Cell>
    <Cell ss:StyleID="s82"><Data ss:Type="String">${(sumTotal.totalAmount?string("0.##"))!0}</Data></Cell>
    <Cell ss:StyleID="s64"/>
   </Row>
     <Row>
       <Cell ss:MergeAcross="1" ss:StyleID="s81"><Data ss:Type="String">收款总额</Data></Cell>
       <Cell ss:StyleID="s82"><Data ss:Type="String">${(sumTotal.payAmount?string("0.##"))!0}</Data></Cell>
       <Cell ss:StyleID="s64"/>
      </Row>
     <Row>
     <Cell ss:MergeAcross="1" ss:StyleID="s81"><Data ss:Type="String">折扣总额</Data></Cell>
     <Cell ss:StyleID="s82"><Data ss:Type="String">${(sumTotal.discountAmount?string("0.##"))!0}</Data></Cell>
     <Cell ss:StyleID="s64"/>
    </Row>
     <Row>
     <Cell ss:MergeAcross="1" ss:StyleID="s81"><Data ss:Type="String">退款总额</Data></Cell>
     <Cell ss:StyleID="s82"><Data ss:Type="String">${(sumTotal.refundAmount?string("0.##"))!0}</Data></Cell>
     <Cell ss:StyleID="s64"/>
    </Row>
     <Row>
         <Cell ss:MergeAcross="1" ss:StyleID="s81"><Data ss:Type="String">应收总额</Data></Cell>
         <Cell ss:StyleID="s82"><Data ss:Type="String">${((sumTotal.payAmount-sumTotal.refundAmount)?string("0.##"))!0}</Data></Cell>
         <Cell ss:StyleID="s64"/>
      </Row>
   <Row>
    <Cell ss:StyleID="s82"/>
    <Cell ss:StyleID="s82"/>
    <Cell ss:StyleID="s82"/>
    <Cell ss:StyleID="s64"/>
   </Row>
   <Row>
    <Cell ss:StyleID="s82"><Data ss:Type="String">店铺名称</Data></Cell>
    <Cell ss:StyleID="s82"><Data ss:Type="String">订单总数</Data></Cell>
    <Cell ss:StyleID="s82"><Data ss:Type="String">订单总额</Data></Cell>
    <Cell ss:StyleID="s82"><Data ss:Type="String">收款总额</Data></Cell>
    <Cell ss:StyleID="s82"><Data ss:Type="String">折扣总额</Data></Cell>
     <Cell ss:StyleID="s82"><Data ss:Type="String">退款单数</Data></Cell>
     <Cell ss:StyleID="s82"><Data ss:Type="String">退款总额</Data></Cell>
     <Cell ss:StyleID="s82"><Data ss:Type="String">应收总额</Data></Cell>
   </Row>
   <#if sumTotal.list??>
       <#list sumTotal.list as sumobj>
       <Row>
        <Cell ss:StyleID="s64"><Data ss:Type="String">${sumobj.shopName?if_exists}</Data></Cell>
        <Cell ss:StyleID="s64"><Data ss:Type="String">${sumobj.orderCount?if_exists}</Data></Cell>
        <Cell ss:StyleID="s64"><Data ss:Type="String">${(sumobj.totalAmount?string("0.##"))?if_exists}</Data></Cell>
        <Cell ss:StyleID="s64"><Data ss:Type="String">${(sumobj.payAmount?string("0.##"))?if_exists}</Data></Cell>
        <Cell ss:StyleID="s64"><Data ss:Type="String">${(sumobj.discountAmount?string("0.##"))?if_exists}</Data></Cell>

         <Cell ss:StyleID="s64"><Data ss:Type="String">${sumobj.refundCount?if_exists}</Data></Cell>
        <Cell ss:StyleID="s64"><Data ss:Type="String">${(sumobj.refundAmount?string("0.##"))?if_exists}</Data></Cell>
        <Cell ss:StyleID="s64"><Data ss:Type="String">${((sumobj.payAmount-sumobj.refundAmount)?string("0.##"))?if_exists}</Data></Cell>
       </Row>
       </#list>
   </#if>
  </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <PageSetup>
    <Header x:Margin="0.3"/>
    <Footer x:Margin="0.3"/>
    <PageMargins x:Bottom="0.75" x:Left="0.7" x:Right="0.7" x:Top="0.75"/>
   </PageSetup>
   <Print>
    <ValidPrinterInfo/>
    <PaperSizeIndex>9</PaperSizeIndex>
    <HorizontalResolution>200</HorizontalResolution>
    <VerticalResolution>200</VerticalResolution>
   </Print>
   <Selected/>
   <Panes>
    <Pane>
     <Number>3</Number>
     <ActiveRow>10</ActiveRow>
     <ActiveCol>1</ActiveCol>
    </Pane>
   </Panes>
   <ProtectObjects>False</ProtectObjects>
   <ProtectScenarios>False</ProtectScenarios>
  </WorksheetOptions>
 </Worksheet>
 <Worksheet ss:Name="Sheet3">
  <Table ss:ExpandedColumnCount="1" ss:ExpandedRowCount="1" x:FullColumns="1"
   x:FullRows="1" ss:DefaultRowHeight="14.4">
  </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <PageSetup>
    <Header x:Margin="0.3"/>
    <Footer x:Margin="0.3"/>
    <PageMargins x:Bottom="0.75" x:Left="0.7" x:Right="0.7" x:Top="0.75"/>
   </PageSetup>
   <Print>
    <ValidPrinterInfo/>
    <PaperSizeIndex>9</PaperSizeIndex>
    <HorizontalResolution>200</HorizontalResolution>
    <VerticalResolution>200</VerticalResolution>
   </Print>
   <ProtectObjects>False</ProtectObjects>
   <ProtectScenarios>False</ProtectScenarios>
  </WorksheetOptions>
 </Worksheet>
</Workbook>
