package com.sparta.myblog.domain.board;

import com.sparta.myblog.domain.timestamp.Timestamped;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Board extends Timestamped {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String writer;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Long views;

    @Column(nullable = false)
    private Character status;

    public Board(BoardDto boardDto) {
        this.title = boardDto.getTitle();
        this.writer = boardDto.getWriter();
        this.content = boardDto.getContent();
        this.views = 1L;
        this.status = '1';
    }

    @Builder
    public Board(String title, String writer, String content, Long views, Character status) {
        this.title = title;
        this.writer = writer;
        this.content = content;
        this.views = views;
        this.status = status;
    }

    public void update(BoardDto boardDto){
        this.title = boardDto.getTitle();
        this.writer = boardDto.getWriter();
        this.content = boardDto.getContent();
    }

    public void increaseView(){
        this.views += 1;
    }


}
