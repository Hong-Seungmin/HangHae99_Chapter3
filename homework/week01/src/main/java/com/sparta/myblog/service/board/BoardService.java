package com.sparta.myblog.service.board;

import com.sparta.myblog.domain.board.Board;
import com.sparta.myblog.domain.board.BoardDto;
import com.sparta.myblog.domain.board.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BoardService {
//  참고사이트  https://congsong.tistory.com/55?category=749196

    private final BoardRepository boardRepository;

    @Transactional
    public Long save(BoardDto boardDto) {
        Board board = boardRepository.save(new Board(boardDto));
        return board.getId();
    }

    public List<Board> findAll() {
        Sort sort = Sort.by(Sort.Direction.DESC, "id", "createdAt");
        return boardRepository.findAll(sort);
    }

    @Transactional
    public Long update(Long id, BoardDto boardDto) {
        Board board = boardRepository.findById(id).orElseThrow(NullPointerException::new);
        board.update(boardDto);

        return id;
    }

    @Transactional
    public void delete(Long id){
        Board board = boardRepository.findById(id).orElseThrow(NullPointerException::new);
        boardRepository.delete(board);
    }
}
