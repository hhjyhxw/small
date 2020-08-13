package com.icloud.basecommon.util.excelutilss;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.LinkedList;
import java.util.List;

/**
 * 读Excel多个sheet工具，得到sheet数后传入
 * @author 刘家朝
 * @version 1.0, 2016-1-14
 */
public class ExcelMoreSheetPoiUtil {

	public static int getExcelSheetNum(File file) throws IOException {
		String fileName = file.getName();
		String extension = fileName.lastIndexOf(".") == -1 ? "" : fileName
				.substring(fileName.lastIndexOf(".") + 1);
		if ("xls".equals(extension)) {
			return get2003ExcelSheetNum(file);
		} else if ("xlsx".equals(extension)) {
			return get2007ExcelSheetNum(file);
		} else {
			throw new IOException("不支持的文件类型");
		}
	}

	/**
	 * 得到2003版本Excel的sheet数
	 * @param file
	 * @return
	 * @throws IOException
	 */
	private static int get2003ExcelSheetNum(File file) throws IOException {
		HSSFWorkbook hwb = new HSSFWorkbook(new FileInputStream(file));
		int sheetNum = hwb.getNumberOfSheets();
		return sheetNum;
	}

	/**
	 * 得到2007版本Excel的sheet数
	 * @param file
	 * @return
	 * @throws IOException
	 */
	private static int get2007ExcelSheetNum(File file) throws IOException {
		// 构造 XSSFWorkbook 对象，strPath 传入文件路径
		XSSFWorkbook xwb = new XSSFWorkbook(new FileInputStream(file));
		int sheetNum = xwb.getNumberOfSheets();
		return sheetNum;
	}

	/**
	 * @Title: readExcel
	 * @Description: 对外提供读取excel 的方法,支持2003和2007
	 * @param file
	 * @param sheetNum 第某张表格
	 * @param @throws IOException 设定文件
	 * @return List<List<List<Object>>> 返回类型
	 * @author liujc
	 * @date 2016-01-12
	 * @throws
	 */
	public static List<List<Object>> readExcel(File file, int sheetNum) throws IOException {
		String fileName = file.getName();
		String extension = fileName.lastIndexOf(".") == -1 ? "" : fileName
				.substring(fileName.lastIndexOf(".") + 1);
		if ("xls".equals(extension)) {
			return read2003Excel(file, sheetNum);
		} else if ("xlsx".equals(extension)) {
			return read2007Excel(file, sheetNum);
		} else {
			throw new IOException("不支持的文件类型");
		}
	}

	/**
	 * @Title: read2003Excel
	 * @Description: 读取 office 2003 excel
	 * @param file
	 * @param sheetNum 第某张表格
	 * //@param m 从第m行开始读取
	 *  //@param n 第n列
	 * @param @throws IOException 设定文件
	 * @return List<List<Object>> 返回类型
	 * @author liujc
	 * @date 2016-01-12
	 * @throws
	 */
	private static List<List<Object>> read2003Excel(File file, int sheetNum) throws IOException {
		List<List<Object>> list = new LinkedList<List<Object>>();
		HSSFWorkbook hwb = new HSSFWorkbook(new FileInputStream(file));
		// 读取第num+1张表格内容
		HSSFSheet sheet = hwb.getSheetAt(sheetNum);
		if(sheet != null){
			Object value = null;
			HSSFRow row = null;
			HSSFCell cell = null;
			int maxLine = 0;
			for (int m = 0; m <= sheet.getPhysicalNumberOfRows(); m++) {
				row = sheet.getRow(m);
				if (row == null) {
					continue;
				}
				if(maxLine < row.getLastCellNum()){
					maxLine = row.getLastCellNum();
				}
				// 如果主键为空，不读取
//					union = row.getCell(m).getStringCellValue();
//					// System.out.println("union:"+union);
//					if (!StringUtil.checkObj(union)) {
//						continue;
//					}
				List<Object> linked = new LinkedList<Object>();
				for (int n = 0; n <= maxLine; n++) {
					cell = row.getCell(n);
					if (cell == null) {
						linked.add("");
						continue;
					}
					DecimalFormat df = new DecimalFormat("0");// 格式化 number
					// String
					// 字符
					SimpleDateFormat sdf = new SimpleDateFormat(
							"yyyy-MM-dd HH:mm:ss");// 格式化日期字符串
					DecimalFormat nf = new DecimalFormat("0");// 格式化数字

					switch (cell.getCellType()) {
						case XSSFCell.CELL_TYPE_STRING:
							// System.out.println(i+"行"+j+" 列 is String type");
							value = cell.getStringCellValue();
							break;
						case XSSFCell.CELL_TYPE_NUMERIC:
							// System.out.println(i+"行"+j+" 列 is Number type ; DateFormt:"+cell.getCellStyle().getDataFormatString());
							if ("@".equals(cell.getCellStyle().getDataFormatString())) {
								value = df.format(cell.getNumericCellValue());
							} else if ("General".equals(cell.getCellStyle()
									.getDataFormatString())) {
								value = nf.format(cell.getNumericCellValue());
							} else {
								value = sdf.format(HSSFDateUtil.getJavaDate(cell
										.getNumericCellValue()));
							}
							break;
						case XSSFCell.CELL_TYPE_BOOLEAN:
							// System.out.println(i+"行"+j+" 列 is Boolean type");
							value = cell.getBooleanCellValue();
							break;
						case XSSFCell.CELL_TYPE_BLANK:
							// System.out.println(i+"行"+j+" 列 is Blank type");
							value = "";
							break;
						//公式
						case XSSFCell.CELL_TYPE_FORMULA:
							//value = cell.getNumericCellValue();
							value = cell.getNumericCellValue();
							break;
						default:
							// System.out.println(i+"行"+j+" 列 is default type");
							value = cell.toString();
					}

					/*
					 * if (value == null || "".equals(value)) { continue; }
					 */
					linked.add(value);
				}
				list.add(linked);
			}
		}
		return list;
	}

	/**
	 * @Title: read2007Excel
	 * @Description: 读取 office 2007 excel
	 * @param file
	 * @param sheetNum 第某张表格
	 * @param //m 从第m行开始读取
	 * @param //n 第n列
	 * @param @throws IOException 设定文件
	 * @return List<List<Object>> 返回类型
	 * @author liujc
	 * @date 2016-01-12
	 * @throws
	 */
	private static List<List<Object>> read2007Excel(File file, int sheetNum) throws IOException {
		List<List<Object>> list = new LinkedList<List<Object>>();
		// 构造 XSSFWorkbook 对象，strPath 传入文件路径
		XSSFWorkbook xwb = new XSSFWorkbook(new FileInputStream(file));
		// 读取第num+1张表格内容
		XSSFSheet sheet = xwb.getSheetAt(sheetNum);
		if(sheet != null){
			Object value = null;
			XSSFRow row = null;
			XSSFCell cell = null;
			int maxLine = 0;
			for (int m = 0; m <= sheet.getPhysicalNumberOfRows(); m++) {
				row = sheet.getRow(m);
				if (row == null) {
					continue;
				}
				if(maxLine < row.getLastCellNum()){
					maxLine = row.getLastCellNum();
				}
//					row.getCell(m).setCellType(Cell.CELL_TYPE_STRING);
				// 如果主键为空，不读取
//					union = row.getCell(m).getStringCellValue();
////					System.out.println("union:" + union);
//					if (!StringUtil.checkObj(union)) {
//						continue;
//					}
				List<Object> linked = new LinkedList<Object>();
				for (int n = 0; n <= maxLine; n++) {
					cell = row.getCell(n);
					if (cell == null) {
						linked.add("");
						continue;
					}
					DecimalFormat df = new DecimalFormat("0");// 格式化 number String
					// 字符
					SimpleDateFormat sdf = new SimpleDateFormat(
							"yyyy-MM-dd HH:mm:ss");// 格式化日期字符串
					DecimalFormat nf = new DecimalFormat("0");// 格式化数字
					switch (cell.getCellType()) {
						case XSSFCell.CELL_TYPE_STRING:
							// System.out.println(i+"行"+j+" 列 is String type");
							value = cell.getStringCellValue();
							break;
						case XSSFCell.CELL_TYPE_NUMERIC:
							// System.out.println(i+"行"+j+" 列 is Number type ; DateFormt:"+cell.getCellStyle().getDataFormatString());
							if ("@".equals(cell.getCellStyle().getDataFormatString())) {
								value = df.format(cell.getNumericCellValue());
							} else if ("General".equals(cell.getCellStyle()
									.getDataFormatString())) {
								value = nf.format(cell.getNumericCellValue());
							} else {
								value = sdf.format(HSSFDateUtil.getJavaDate(cell
										.getNumericCellValue()));
							}
							break;
						case XSSFCell.CELL_TYPE_BOOLEAN:
							// System.out.println(i+"行"+j+" 列 is Boolean type");
							value = cell.getBooleanCellValue();
							break;
						case XSSFCell.CELL_TYPE_BLANK:
							// System.out.println(i+"行"+j+" 列 is Blank type");
							value = "";
							break;
						default:
							// System.out.println(i+"行"+j+" 列 is default type");
							value = cell.toString();
					}
					/*
					 * if (value == null || "".equals(value)) { continue; }
					 */
					linked.add(value);
				}
				list.add(linked);
			}
		}
		return list;
	}

}
