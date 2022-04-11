package com.sparta.myblog.service.comment;

import com.sparta.myblog.domain.comment.Comment;
import com.sparta.myblog.domain.comment.CommentDto;
import com.sparta.myblog.domain.comment.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.NonUniqueResultException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;

    @Transactional
    public Long save(CommentDto commentDto) {
        Comment comment = commentRepository.save(new Comment(commentDto));
        return comment.getBoardId();
    }

    @Transactional
    public Long update(Long id, CommentDto commentDto) {
        Comment comment = commentRepository.findById(id).orElseThrow(NonUniqueResultException::new);
        comment.update(commentDto);

        return comment.getBoardId();
    }

    @Transactional
    public Long delete(Long id){
        Comment comment = commentRepository.findById(id).orElseThrow(NonUniqueResultException::new);
        Long boardId = comment.getBoardId();
        commentRepository.delete(comment);
        return boardId;
    }

    public List<Comment> findAllByBoardId(Long id) {
        return commentRepository.findByBoardIdOrderByModifiedAtDesc(id);
    }
}
