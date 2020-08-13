package com.icloud.basecommon.util.excelutilss;//
//import java.io.OutputStream;
//import java.util.List;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.beans.BeanWrapper;
//import org.springframework.beans.BeanWrapperImpl;
//
//import jxl.Workbook;
//import jxl.format.Colour;
//import jxl.format.UnderlineStyle;
//import jxl.write.WritableCellFormat;
//import jxl.write.WritableFont;
//import jxl.write.WritableWorkbook;
//
//public class ExportUtil {
//    /**
//     * 导出excel
//     * @param request
//     * @param response
//     * @param list
//     * @param fileName
//     * @throws BaseException
//     */
//    @SuppressWarnings("rawtypes")
//    public static void export(HttpServletResponse response, List list, Map<String, String> confMap, String fileName) throws Exception {
//        response.reset();
//        if (fileName == null || fileName.trim().equals("")) {
//            fileName = "default.xls"; // 定义保存的文件名字
//        }
//        try {
//            fileName = new String(fileName.getBytes("gb2312"), "iso8859-1");
//        } catch (Exception e1) {
//            e1.printStackTrace();
//            fileName = "default.xls";
//        }
//
//        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
//        response.setContentType("application/vnd.ms-excel;charset=GBK");
//
//        WritableFont titleFont = new WritableFont(WritableFont.ARIAL, 11, WritableFont.NO_BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
//        WritableCellFormat titleFormat = new WritableCellFormat(titleFont);
//        WritableFont detFont = new WritableFont(WritableFont.ARIAL, 10, WritableFont.NO_BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
//        WritableCellFormat detFormat = new WritableCellFormat(detFont);
//
//        try {
//            OutputStream os = response.getOutputStream();
//            WritableWorkbook wwb = Workbook.createWorkbook(os);
//            jxl.write.WritableSheet ws = wwb.createSheet("Sheet1", 0);
//            jxl.write.Label labelC = null;
//
//            // ##############打印头#############################
//            int j = 0;
//            for (String value : confMap.values()) {
//                int length = 30;
//                if (value != null && !"".equals(value) && value.indexOf("@@@") > 0) {
//                    String[] values = value.split("@@@");
//                    value = values[0];
//                    try {
//                        length = Integer.parseInt(values[1]);
//                    } catch (Exception e) {
//                    }
//                }
//                labelC = new jxl.write.Label(j, 0, value, titleFormat);
//                ws.addCell(labelC);
//                // 设置表格的宽度
//                ws.setColumnView(j, length);
//                j++;
//            }
//            // ############# body#############################
//            for (int rows = 0; rows < list.size(); rows++) {
//                BeanWrapper wrapper = new BeanWrapperImpl(list.get(rows));
//                int cols = 0;
//                for (Map.Entry<String, String> entry : confMap.entrySet()) {
//                    Object lvalue = wrapper.getPropertyValue(entry.getKey());
//                    if (lvalue == null || lvalue.equals("")) {
//                        lvalue = " ";
//                    }
//                    labelC = new jxl.write.Label(cols, rows + 1, lvalue.toString(), detFormat);
//                    ws.addCell(labelC);
//                    cols++;
//                }
//            }
//            wwb.write();
//            // 关闭Excel工作薄对象
//            wwb.close();
//        } catch (Exception e) {
//            throw new Exception(e);
//        }
//    }
//}
