package com.sparta.myblog.domain.board;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BoardTest {

    @Autowired
    BoardRepository boardRepository;

    @Test
    void save() {
        Board board = Board.builder()
                .title("첫 게시물")
                .content("첫 게시물 내용")
                .writer("작성자")
                .views(0L)
                .status('N')
                .build();

        Board result = boardRepository.save(board);

        assertThat(board.getId()).isEqualTo(result.getId());
    }

}