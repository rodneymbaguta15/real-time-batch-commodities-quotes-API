package com.commodities_api.dto;

import lombok.Builder;
import lombok.Data;

/**
 * DTO for representing a list of tracked commodities across various sectors.
 */
@Data
@Builder
public class CommodityListDTO {

    private String symbol;
    private String name;
    private String exchange;
    private String tradeMonth;
    private String currency;
}
