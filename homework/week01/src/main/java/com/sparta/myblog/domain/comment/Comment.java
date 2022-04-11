package com.sparta.myblog.domain.comment;

import com.sparta.myblog.domain.timestamp.Timestamped;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Comment extends Timestamped {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private Long boardId;

    @Column(nullable = false)
    private String writer;

    @Column(nullable = false)
    private String comment;

    public Comment(CommentDto commentDto) {
        this.id = commentDto.getId();
        this.boardId = commentDto.getBoardId();
        this.writer = commentDto.getWriter();
        this.comment = commentDto.getComment();
    }

    public void update(CommentDto commentDto) {
        this.id = commentDto.getId();
        this.boardId = commentDto.getBoardId();
        this.writer = commentDto.getWriter();
        this.comment = commentDto.getComment();
    }

}
