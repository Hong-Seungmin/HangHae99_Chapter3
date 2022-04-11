package com.sparta.myblog.domain.board;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Getter
public class BoardDto {
    private Long id;
    private String title;
    private String writer;
    private String content;
    private Long views;
    private Character status;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
