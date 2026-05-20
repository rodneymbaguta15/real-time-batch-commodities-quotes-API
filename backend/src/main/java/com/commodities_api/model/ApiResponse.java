package com.commodities_api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

/**
 * Generic API response wrapper that includes metadata about the data source and caching.
 *
 * @param <T> The type of the data being returned in the response.
 */

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse <T>{
    private T data;
    private String source;
    private Instant cachedAt;
    private boolean fromCache;

    public static <T> ApiResponse<T> of(T data, String source) {
        return ApiResponse.<T>builder()
                .data(data)
                .source(source)
                .cachedAt(Instant.now())
                .fromCache(false)
                .build();
    }
}