package com.sparta.myblog.domain.comment;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentDto {
    private Long id;
    private Long boardId;
    private String writer;
    private String comment;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
