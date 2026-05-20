package com.commodities_api.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommodityDTO {

    private String symbol;
    private String name;
    private Double price;
    private Double changePercentage;
    private Double change;
    private Double volume;
    private Double dayLow;
    private Double dayHigh;
    private Double yearHigh;
    private Double yearLow;
    private Long marketCap;
    private Double priceAvg50;
    private Double priceAvg200;
    private String exchange;
    private Double open;
    private Double previousClose;
    private Long timestamp;

}
