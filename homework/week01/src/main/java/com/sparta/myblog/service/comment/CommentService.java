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

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;

    @Transactional
    public Long save(CommentDto commentDto) {
        Comment comment = commentRepository.save(new Comment(commentDto));
        return comment.getId();
    }

    @Transactional
    public Long update(Long id, CommentDto commentDto) {
        Comment comment = commentRepository.findById(id).orElseThrow(NonUniqueResultException::new);
        comment.update(commentDto);

        return id;
    }

    @Transactional
    public void delete(Long id){
        Comment comment = commentRepository.findById(id).orElseThrow(NonUniqueResultException::new);
        commentRepository.delete(comment);
    }

    public List<Comment> findAllByBoardId(Long id) {
        Sort sort = Sort.by(Sort.Direction.DESC, "boardId", "createdAt");
        return commentRepository.findAll(sort);
    }
}
