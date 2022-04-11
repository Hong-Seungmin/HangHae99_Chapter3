$(document).ready(function () {


    showAllBoards();
    createModalInit();
})

/*
글쓰기 버튼 (또는 게시글) 클릭할때 띄어주는 모달창 설정
 */
function createModalInit() {
    getContentSerializeObject();

    $("#write-modal-button").click(function () {
        $('#save-board').off('click').on('click', function () {
        });
        $('#save-board').click(function () {
            if (isBoardValid()) {
                data = $('#form').serializeObject();
                // console.log(data);

                $.ajax({
                    type: 'POST',
                    url: '/api/boards',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function (res) {
                        alert("성공적으로 등록되었습니다.");
                        $(".modal").fadeOut();
                        window.location.reload();
                    }
                });
            }
        });
        hideBtnAndComment();
        $(".modal").fadeIn();
    });

    $("#close-modal").click(function () {
        $(".modal").fadeOut();
        window.location.reload();
    });


}

/*
폼데이터를 json으로 바꿀수있게 직렬화 진행
 */
function getContentSerializeObject() {
    jQuery.fn.serializeObject = function () {
        var obj = null;
        try {
            if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
                var arr = this.serializeArray();
                if (arr) {
                    obj = {};
                    jQuery.each(arr, function () {
                        obj[this.name] = this.value;
                    });
                }//if ( arr ) {
            }
        } catch (e) {
            alert(e.message);
        } finally {
        }

        return obj;
    };
}

/*
모든 게시글 조회하기
 */
function showAllBoards() {
    $.ajax({
        type: 'GET',
        url: '/api/boards',
        success: function (response) {
            $('#board-container').empty();
            for (let i = 0; i < response.length; i++) {
                let tempHtml = ``;
                if (i % 2 === 0)
                    tempHtml = addBoardHtml(response[i], "");
                else
                    tempHtml = addBoardHtml(response[i], "class='even'");
                $('#board-container').append(tempHtml);
            }
        }
    })
}

/*
모든 게시글 조회할때, 게시글 html 생성
 */
function addBoardHtml(board, flag) {
    const createTime = moment(board.createdAt).format('YY-MM-DD HH:mm:ss');
    const updateTime = moment(board.modifiedAt).format('YY-MM-DD HH:mm:ss');
    const time = createTime === updateTime ? createTime : updateTime + "\n(수정됨)"


    return `
    <tr ${flag}>
        <td>${board.id}</td>
        <td style="cursor:pointer;" onclick="showBoardContent(${board.id})">${board.title}</td>
        <td>${board.writer}</td>
        <td>${time}</td>
        <td>${board.views}</td>
    </tr>
    `;
}

/*
클릭한 게시글 조회하기.<br>
클릭한 게시글과 댓글이 나타난다.
 */
function showBoardContent(id) {
    showOneBoard(id);
    showOneBoardComments(id);
    showBtnAndComment(id);

    $('#save-comment').off('click').on('click', function () {
    });
    $('#save-comment').click(function () {
        createComment(id);
    });

    $(".modal").fadeIn();

}

/*
게시글 불러오기
 */
function showOneBoard(id) {
    $.ajax({
        type: 'GET',
        url: '/api/boards/' + id,
        success: function (res) {
            $('#title').val(res.title);
            $('#writer').val(res.writer);
            $('#content').val(res.content);
        }
    });

    initOneBoardSaveBtn(id);
}

/*
클릭한 게시글이 모달창으로 나타나면, 모달창 안에 있는 저장 버튼을 설정한다. <br>
*클릭한 게시글 id가 버튼에 지정된다.
 */
function initOneBoardSaveBtn(id) {
    $('#save-board').off('click').on('click', function () {
    });

    $('#save-board').click(function () {
        console.log("????")
        if (isBoardValid()) {
            data = $('#form').serializeObject();
            // console.log(data);

            $.ajax({
                type: 'PATCH',
                url: '/api/boards/' + id,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (res) {
                    alert("성공적으로 수정되었습니다.");
                    $(".modal").fadeOut();
                    window.location.reload();
                }
            });
        }
    });
}

/*
게시글에 해당하는 댓글 불러오기
 */
function showOneBoardComments(boardId) {
    $.ajax({
        type: 'GET',
        url: '/api/comments/' + boardId,
        success: function (res) {
            $('#comment-container').empty();
            for (let i = 0; i < res.length; i++) {
                let tempHtml = ``;
                if (i % 2 === 0)
                    tempHtml = addCommentHtml(res[i], "");
                else
                    tempHtml = addCommentHtml(res[i], "class='even'");
                $('#comment-container').append(tempHtml);
            }
        }
    })
}

/*
댓글을 표현하기 위한 html을 생선한다.
 */
function addCommentHtml(comment, flag) {
    const createTime = moment(comment.createdAt).format('YY-MM-DD HH:mm:ss');
    const updateTime = moment(comment.modifiedAt).format('YY-MM-DD HH:mm:ss');
    const time = createTime === updateTime ? createTime : updateTime + "\n(수정됨)"


    return `
    <tr ${flag}>
        <td>
            <input id="comment-${comment.id}" value="${comment.comment}" style="width: 100%; border:0 solid black; background: transparent;">
        </td>
        <td>
            <input id="comment-writer-${comment.id}" value="${comment.writer}" style="width: 100%; border:0 solid black; background: transparent;">
        </td>
        <td>${time}</td>
        <td>
        <a onclick="updateComment(${comment.id})" style="cursor:pointer">수정</a>
        <a onclick="deleteComment(${comment.id})" style="cursor:pointer">삭제</a>
        </td>
    </tr>
    `;
}

/*
댓글 수정
 */
function updateComment(id) {
    if ($('#comment-' + id).val() === '') {
        alert('댓글을 입력해주세요.');
        return;
    }
    if ($('#comment-writer-' + id).val() === '') {
        alert('이름을 입력해주세요.');
        return;
    }

    const data = {
        id: id,
        comment: $('#comment-' + id).val(),
        writer: $('#comment-writer-' + id).val()
    }

    $.ajax({
        type: 'PATCH',
        url: '/api/comments/' + id,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {
            alert("성공적으로 수정되었습니다.");
            showOneBoardComments(res);
        }
    });

}

/*
댓글 삭제
 */
function deleteComment(id) {
    const data = {
        id: id
    }
    $.ajax({
        type: 'DELETE',
        url: '/api/comments/' + id,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {
            alert("성공적으로 삭제되었습니다.");
            showOneBoardComments(res);
        }
    });
}

/*
댓글을 생성한다.
 */
function createComment(boardId) {
    if (isCommentValid()) {
        data = {
            boardId: boardId,
            writer: $('#writer-comment').val(),
            comment: $('#comment').val()
        }
        // console.log(data);

        $.ajax({
            type: 'POST',
            url: '/api/comments/',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (res) {
                alert("성공적으로 등록되었습니다.");
                $('#writer-comment').val('');
                $('#comment').val('');
                showOneBoardComments(boardId);
            }
        });
    }
}

function isCommentValid() {
    if ($('#writer-comment').val().trim() === '') {
        alert("이름을 입력해주세요.");
        $('#title').focus();
        return false;
    }
    if ($('#comment').val().trim() === '') {
        alert("내용을 입력해주세요.");
        $('#writer').focus();
        return false;
    }
    return true;
}

function isBoardValid() {
    if ($('#title').val().trim() === '') {
        alert("제목을 입력해주세요.");
        $('#title').focus();
        return false;
    }
    if ($('#writer').val().trim() === '') {
        alert("이름을 입력해주세요.");
        $('#writer').focus();
        return false;
    }
    if ($('#content').val().trim() === '') {
        alert("내용을 입력해주세요.");
        $('#content').focus();
        return false;
    }
    return true;
}

/*
게시글 삭제버튼과 댓글목록을 표시해준다. <br>
*게시글 등록과 게시글확인 모달창을 재활용
 */
function showBtnAndComment(id) {
    $('#delete-board').css("display", "inline");
    $('#delete-board').off('click').on('click', function () {
    });
    $('#delete-board').click(function () {
        if (isBoardValid()) {
            $.ajax({
                type: 'DELETE',
                url: '/api/boards/' + id,
                success: function (res) {
                    alert("성공적으로 삭제되었습니다.");
                    $(".modal").fadeOut();
                    window.location.reload();
                }
            });
        }
    });

    $('.card-comment').css('display', 'block');

}


function hideBtnAndComment() {
    $('#delete-board').css("display", "none");
    $('.card-comment').css("display", "none");
}

