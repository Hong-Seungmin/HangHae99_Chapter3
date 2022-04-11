package com.sparta.myblog.controller.board;

import com.sparta.myblog.domain.board.Board;
import com.sparta.myblog.domain.board.BoardDto;
import com.sparta.myblog.domain.board.BoardRepository;
import com.sparta.myblog.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class BoardRestController {

    private final BoardService boardService;

    @PostMapping("/boards")
    public Long createBoard(@RequestBody BoardDto boardDto) {
        return boardService.save(boardDto);
    }

    @GetMapping("/boards")
    public List<Board> getBoards() {
        return boardService.findAll();
    }

    @GetMapping("/boards/{id}")
    public Board getBoardOne(@PathVariable Long id) {
        return boardService.findOne(id);
    }

    @PatchMapping("/boards/{id}")
    public Long updateBoard(@PathVariable Long id, @RequestBody BoardDto boardDto) {
        return boardService.update(id, boardDto);
    }

    @DeleteMapping("/boards/{id}")
    public Long deleteBoard(@PathVariable Long id) {
        boardService.delete(id);
        return id;
    }
}
