package com.icloud.modules.small.vo.card;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class CardReceiveParamVo {
    @NotEmpty(message = "data数据不能为空")
    private String data;//业务数据加密窜
    @NotEmpty(message = "渠道号不能为空")
    private String channelCode;//渠道号
}
