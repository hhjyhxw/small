package com.icloud.exceptions;
/**
 * @filename      : FormRepeatException.java
 * @description   : 
 * @author        : zdh
 * @create        : 2017年9月17日 上午10:26:31   
 * @copyright     : zhumeng.com@hyzy-activities
 *
 * Modification History:
 * Date             Author       Version
 * --------------------------------------
 */
public class FormRepeatException extends RuntimeException {
	 
    public FormRepeatException(String message){ super(message);}
 
    public FormRepeatException(String message, Throwable cause){ super(message, cause);}
}
