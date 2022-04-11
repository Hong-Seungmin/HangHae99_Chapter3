package com.sparta.myblog.controller.comment;

import com.sparta.myblog.domain.comment.Comment;
import com.sparta.myblog.domain.comment.CommentDto;
import com.sparta.myblog.service.comment.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class CommentRestController {

    private final CommentService commentService;

    @GetMapping("/comments/{boardId}")
    public List<Comment> getComments(@PathVariable  Long boardId) {
        return commentService.findAllByBoardId(boardId);
    }

    // 반환값 : 게시글 ID
    @PostMapping("/comments")
    public Long createComment(@RequestBody CommentDto commentDto) {
        return commentService.save(commentDto);
    }

    // 반환값 : 게시글 ID
    @PatchMapping("/comments/{id}")
    public Long updateComment(@PathVariable Long id, @RequestBody CommentDto commentDto) {
        return commentService.update(id, commentDto);
    }

    @DeleteMapping("/comments/{id}")
    public Long deleteComment(@PathVariable Long id) {
        return commentService.delete(id);
    }
}
