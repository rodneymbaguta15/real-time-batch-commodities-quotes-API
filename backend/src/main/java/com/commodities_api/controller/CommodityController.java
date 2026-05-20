package com.commodities_api.controller;


import com.commodities_api.dto.CommodityDTO;
import com.commodities_api.dto.CommodityListDTO;
import com.commodities_api.model.ApiResponse;
import com.commodities_api.service.CommodityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/quote")
@RequiredArgsConstructor
public class CommodityController {

    private final CommodityService commodityService;

    /**
     * * Endpoint to fetch commodity quote data by symbol.
     * * Uses the commodityService to retrieve data, which may involve fetching from cache or external API (FMP).
     * * Returns a CommodityDTO containing the quote data for the requested symbol
     */
    @GetMapping("/{symbol}")
    public ResponseEntity<ApiResponse<CommodityDTO>>getQuote(
            @PathVariable String symbol){
        log.info("Received request for commodity quote with symbol: {}", symbol);
        return ResponseEntity.ok(commodityService.getQuote(symbol.toUpperCase()));
    }

   /**
     * Endpoint to fetch a list of all tracked commodities.
     * Returns a list of CommodityListDTO objects, each representing a commodity with its symbol, name, exchange, trade month, and currency.
     */
    @GetMapping("/list")
    public ResponseEntity<List<ApiResponse<CommodityListDTO>>> getCommoditiesList() {
        log.info("Received request for full commodities list");
        return ResponseEntity.ok(commodityService.getCommoditiesList());
    }

}
