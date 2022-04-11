package com.sparta.myblog.controller.board;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/board")
@Controller
public class BoardController {

    @GetMapping("/list")
    public String openBoard(){
        return "index";
    }

    @GetMapping("/create")
    public String createBoard(){
        return "board/create";
    }
}
