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

public class ExcelPoiUtil {

	/**
	 *
	 * @Title: readExcel
	 * @Description: 对外提供读取excel 的方法,支持2003和2007
	 * @param @param file
	 * @param @param beginRow 从第n行开始读取
	 * @param @param union 非空列号(此列为空则读取下一行)
	 * @param @param firstCellNum 读取的第一列
	 * @param @param lastCellNum 读取的最后的一列
	 * @param @return
	 * @param @throws IOException 设定文件
	 * @return List<List<Object>> 返回类型
	 * @author yr_xiezhy
	 * @date 2015-3-11 下午5:12:31
	 * @throws
	 */
	public static List<List<Object>> readExcel(File file)
			throws IOException {
		String fileName = file.getName();
		String extension = fileName.lastIndexOf(".") == -1 ? "" : fileName
				.substring(fileName.lastIndexOf(".") + 1);
		if ("xls".equals(extension)) {
			return read2003Excel(file);
		} else if ("xlsx".equals(extension)) {
			return read2007Excel(file);
		} else {
			throw new IOException("不支持的文件类型");
		}
	}

	/**
	 *
	 * @Title: read2003Excel
	 * @Description: 读取 office 2003 excel
	 * @param @param file
	 * @param @param n 从第n行开始读取
	 * @param @param m 非空列号(此列为空则读取下一行)
	 * @param @throws IOException 设定文件
	 * @return List<List<Object>> 返回类型
	 * @author yr_xiezhy
	 * @date 2015-3-11 下午4:14:28
	 * @throws
	 */
	private static List<List<Object>> read2003Excel(File file)
			throws IOException {
		List<List<Object>> list = new LinkedList<List<Object>>();
		HSSFWorkbook hwb = new HSSFWorkbook(new FileInputStream(file));
		HSSFSheet sheet = hwb.getSheetAt(0);
		Object value = null;
		HSSFRow row = null;
		HSSFCell cell = null;
		String union = "";
		for (int i = 0; i <= sheet.getPhysicalNumberOfRows(); i++) {
			row = sheet.getRow(i);
			if (row == null) {
				continue;
			}
			// 如果主键为空，不读取
//			union = row.getCell(m).getStringCellValue();
//			// System.out.println("union:"+union);
//			if (!StringUtil.checkObj(union)) {
//				continue;
//			}
			List<Object> linked = new LinkedList<Object>();
			for (int j = 0; j <= row.getLastCellNum(); j++) {
				cell = row.getCell(j);
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

						//System.out.println(i+"行"+j+" 列 is Number type ; DateFormt:"+cell.getCellStyle().getDataFormatString());
						if ("@".equals(cell.getCellStyle().getDataFormatString())) {
							value = df.format(cell.getNumericCellValue());
						}else if ("General".equals(cell.getCellStyle()
								.getDataFormatString())) {
							value = nf.format(cell.getNumericCellValue());
						}else if ("#\\ ?/?".equals(cell.getCellStyle().getDataFormatString())) {
							value = nf.format(cell.getNumericCellValue());
						}else {
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
		return list;
	}

	/**
	 *
	 * @Title: read2007Excel
	 * @Description: 读取Office 2007 excel
	 * @param @param file
	 * @param @param n 从第n行开始读取
	 * @param @param m 非空列号(此列为空则读取下一行)
	 * @param @throws IOException 设定文件
	 * @return List<List<Object>> 返回类型
	 * @author yr_xiezhy
	 * @date 2015-3-11 下午4:14:03
	 * @throws
	 */
	private static List<List<Object>> read2007Excel(File file)
			throws IOException {
		List<List<Object>> list = new LinkedList<List<Object>>();
		// 构造 XSSFWorkbook 对象，strPath 传入文件路径
		XSSFWorkbook xwb = new XSSFWorkbook(new FileInputStream(file));
		// 读取第一章表格内容
		XSSFSheet sheet = xwb.getSheetAt(0);
		Object value = null;
		XSSFRow row = null;
		XSSFCell cell = null;
		String union = "";
		for (int i = 0; i <= sheet.getPhysicalNumberOfRows(); i++) {
			row = sheet.getRow(i);
			if (row == null) {
				continue;
			}
//			row.getCell(m).setCellType(Cell.CELL_TYPE_STRING);
			// 如果主键为空，不读取
//			union = row.getCell(m).getStringCellValue();
////			System.out.println("union:" + union);
//			if (!StringUtil.checkObj(union)) {
//				continue;
//			}
			List<Object> linked = new LinkedList<Object>();
			for (int j = 0; j <= row.getLastCellNum(); j++) {
				cell = row.getCell(j);
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
		return list;
	}

//	public static void main(String[] args) throws IOException {
//		// File file = new File("d:\\up_partnerModel.xls");
//		File file = new File("e:\\卷烟零售户信息收集表（新表） - 20150616.xlsx");
//		List<List<Object>> dataList = ExcelPoiUtil.readExcel(file);
//		for (int i = 0; i < dataList.size(); i++) {
//			List<Object> list_ = dataList.get(i);
//			System.out.println("************:" + list_);
//		}
//		ShopInfo shopInfo = new ShopInfo();
//
//		//第一行表名称去掉
//		dataList.remove(0);
//		//解析省市信息,模板的第二行为省市信息。
//		List<Object> cityList = dataList.get(0);
//		String provin_ch = StringUtil.toString(cityList.get(1));
//		String city_ch = StringUtil.toString(cityList.get(3));
//		dataList.remove(0);//解析完省市行删除
//		dataList.remove(0);//删除第三行列头信息
//		//解析香烟规格，香烟规格从列11开始到最后非空
//		List<Object> standardList = dataList.get(0);
//		for(int i=0;i<11;i++){
//			standardList.remove(0);
//		}
//		List<Object> standardLists = new LinkedList<Object>();
//		for(int i=0;i<standardList.size();i++){
//			if(StringUtil.checkObj(standardList.get(i))){//将列名为空的去掉
//				standardLists.add(standardList.get(i));
//			}
//		}
//		dataList.remove(0);//去掉第四行
//		List<Object> obList = new LinkedList<Object>();
//		// dataList数据保存到数据库中
//		for (int i=0;i<dataList.size();i++) {
//			obList = dataList.get(i);
//			if(!StringUtil.checkObj(obList.get(10))){//序列号为空不保存
//				continue;
//			}
//			String salestandard = "";
//			// 根据序列号查询零售户是否已关注
//			// 根据Excel模板填充ShopInfo对象
////			shopInfo.setSalesDepartment(StringUtil.toString(obList.get(1)));//
//			shopInfo.setCustomerCode(StringUtil.toString(obList.get(1)));
//			shopInfo.setCustomerName(StringUtil.toString(obList.get(2)));
//			shopInfo.setHeader(StringUtil.toString(obList.get(3)));
//			shopInfo.setMobile(StringUtil.toString(obList.get(4)));
//			shopInfo.setFixedTelephone(StringUtil.toString(obList.get(5)));
//			shopInfo.setAddress(StringUtil.toString(obList.get(6)));
//			shopInfo.setHeaderWeChat(StringUtil.toString(obList.get(7)));
//			shopInfo.setMembershipNo1(StringUtil.toString(obList.get(8)));
//			shopInfo.setMembershipNo2(StringUtil.toString(obList.get(9)));
//			shopInfo.setShopNum(StringUtil.toString(obList.get(10)));
//			int m = 0;
//			for(m=0;m<standardLists.size();m++){
//				// 销售的规格
//				if (StringUtil.checkObj(obList.get(m+11))) {
//					salestandard += standardLists.get(m)+",";
//				}
//			}
//			if(salestandard.length()>1){
//				shopInfo.setSalestandard(salestandard.substring(0,salestandard.length()-1));
//			}
//			shopInfo.setZygather(StringUtil.toString(obList.get(m+11)));
//
//			shopInfo.setCityId(city_ch);
//			shopInfo.setProvId(provin_ch);
//		}
//	}
}
