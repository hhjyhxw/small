package com.icloud.basecommon.util;

/**
 * excel的工具类
 * @author huangyl
 *
 */
public class ExcelUtils {

	  // @描述：是否是2003的excel，返回true是2003 
	  public static boolean isExcel2003(String filePath)  {  
	        return filePath.matches("^.+\\.(?i)(xls)$");  
	  }  
	   
	  //@描述：是否是2007的excel，返回true是2007 
	  public static boolean isExcel2007(String filePath)  {  
	        return filePath.matches("^.+\\.(?i)(xlsx)$");  
	  }  
	    
	  /**
	   * 验证EXCEL文件
	   * @param filePath
	   * @return
	   */
	  public static boolean validateExcel(String filePath){
	        if (filePath == null || !(isExcel2003(filePath) || isExcel2007(filePath))){  
	            return false;  
	        }  
	        return true;
	  }
	   
	  /*public static void main(String[] args) {
		String fileName = "卡密数据导入模板.xlsx";
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		System.out.println(fileName.substring(0, fileName.lastIndexOf('.')));
		System.out.println(fileName.substring(0, fileName.lastIndexOf('.')) + time + fileName.substring(fileName.lastIndexOf('.')));
	}*/

}
