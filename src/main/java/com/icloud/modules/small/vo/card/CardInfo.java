package com.icloud.modules.small.vo.card;

import lombok.Data;

@Data
public class CardInfo {
    private String cardName;
    private String cardCode;
    private String cardType;
    private String cardValue;
    private String startTime;
    private String endTime;
    private String discount;
    private String totalAmount;
    private String deductAmount;
    private String lowAmount;

}
