package com.sparta.week04.models.search;

import lombok.Getter;
import org.json.JSONObject;

@Getter
public class SearchProductItemDto {
    private String title;
    private String link;
    private String image;
    private int lprice;

    public SearchProductItemDto(JSONObject itemJson) {
        this.title = itemJson.getString("title");
        this.link = itemJson.getString("link");
        this.image = itemJson.getString("image");
        this.lprice = itemJson.getInt("lprice");
    }
}
