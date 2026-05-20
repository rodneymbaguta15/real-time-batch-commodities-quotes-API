package com.commodities_api.service;

import com.commodities_api.dto.CommodityDTO;
import com.commodities_api.dto.CommodityListDTO;
import com.commodities_api.model.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Service
public class CommodityService {

    private final RestTemplate restTemplate;

    @Value("${fmp.api.url}")
    private String fmpBaseUrl;

    @Value("${fmp.api.key}")
    private String fmpApiKey;

    private static final String SOURCE = "Financial Modeling Prep";

    public CommodityService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Fetches commodity quote data for a given symbol.
     * Results are cached by symbol for the duration of cache.ttl (3600s).
     * On cache hit, the cached ApiResponse is returned directly — no FMP call is made.
     */
    @Cacheable(value = "commodityQuotes", key = "#symbol")
    public ApiResponse<CommodityDTO> getQuote(String symbol) {
        String url = UriComponentsBuilder
                .fromHttpUrl(fmpBaseUrl + "/quote")
                .queryParam("symbol", symbol)
                .queryParam("apikey", fmpApiKey)
                .toUriString();

        log.info("Fetching quote from FMP for symbol: {}", symbol);

        CommodityDTO[] response = restTemplate.getForObject(url, CommodityDTO[].class);

        if (response == null || response.length == 0) {
            log.warn("No data returned from FMP for symbol: {}", symbol);
            throw new RuntimeException("No quote data found for symbol: " + symbol);
        }

        // FMP returns an array; we take the first (and only) element
        return ApiResponse.of(response[0], SOURCE);
    }

    /**
     * Fetches the full list of commodities.
     */
    public List<ApiResponse<CommodityListDTO>> getCommoditiesList() {
        String url = UriComponentsBuilder
                .fromHttpUrl(fmpBaseUrl + "/commodities-list")
                .queryParam("apikey", fmpApiKey)
                .toUriString();

        log.info("Fetching full commodities list from FMP");

        CommodityListDTO[] response = restTemplate.getForObject(url, CommodityListDTO[].class);

        if (response == null || response.length == 0) {
            log.warn("No commodities list returned from FMP");
            throw new RuntimeException("No commodities list data available");
        }

        return Arrays.stream(response)
                .map(dto -> ApiResponse.of(dto, SOURCE))
                .collect(Collectors.toList());
    }
}