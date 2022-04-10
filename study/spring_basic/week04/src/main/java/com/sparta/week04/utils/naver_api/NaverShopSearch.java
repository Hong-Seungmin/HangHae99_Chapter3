package com.sparta.week04.utils.naver_api;

import com.sparta.week04.models.search.SearchProductItemDto;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Component
public class NaverShopSearch {
    public String search(String query) {
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Naver-Client-Id", "KiHrnBJAqIWOZ5WJOe7d");
        headers.add("X-Naver-Client-Secret", "1AGNrS2ZVG");
        String body = "";

        HttpEntity<String> requestEntity = new HttpEntity<String>(body, headers);
        ResponseEntity<String> responseEntity = rest.exchange(
                "https://openapi.naver.com/v1/search/shop.json?query=" + query,
                HttpMethod.GET,
                requestEntity,
                String.class);
        HttpStatus httpStatus = responseEntity.getStatusCode();
        int status = httpStatus.value();
        String response = responseEntity.getBody();
        System.out.println("Response status: " + status);
        System.out.println(response);

        return response;
    }

    public List<SearchProductItemDto> fromJSONtoItems(String result) {
        JSONObject rjson = new JSONObject(result);
        System.out.println("rjson = " + rjson);
        JSONArray items = rjson.getJSONArray("items");
        List<SearchProductItemDto> searchProductItemDtoList = new ArrayList<>();

        for (int i=0; i<items.length(); i++) {
            JSONObject itemJson = (JSONObject) items.get(i);
            System.out.println(itemJson);
            SearchProductItemDto searchProductItemDto = new SearchProductItemDto(itemJson);
            searchProductItemDtoList.add(searchProductItemDto);
        }
        return searchProductItemDtoList;
    }
}
