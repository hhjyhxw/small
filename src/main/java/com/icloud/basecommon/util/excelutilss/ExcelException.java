package com.icloud.basecommon.util.excelutilss;

@SuppressWarnings("serial")
public class ExcelException extends Exception {
	public ExcelException() {
	}

	public ExcelException(String message) {
		super(message);
	}

	public ExcelException(Throwable cause) {
		super(cause);
	}

	public ExcelException(String message, Throwable cause) {
		super(message, cause);
	}

}
