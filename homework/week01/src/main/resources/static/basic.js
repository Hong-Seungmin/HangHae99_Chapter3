$(document).ready(function () {


    showBoards();
    createModalInit();
})


function showBoards() {
    $.ajax({
        type: 'GET',
        url: '/api/boards',
        success: function (response) {
            $('#board-container').empty();
            for (let i = 0; i < response.length; i++) {
                let tempHtml = ``;
                if (i % 2 === 0)
                    tempHtml = addBoardItem(response[i], "");
                else
                    tempHtml = addBoardItem(response[i], "class='even'");
                $('#board-container').append(tempHtml);
            }
        }
    })
}

function addBoardItem(board, flag) {
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

function receiveBoard(id) {
    $.ajax({
        type: 'GET',
        url: '/api/boards/' + id,
        success: function (res) {
            $('#title').val(res.title);
            $('#writer').val(res.writer);
            $('#content').val(res.content);
        }
    });

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

function receiveComments(boardId) {
    $.ajax({
        type: 'GET',
        url: '/api/comments/' + boardId,
        success: function (res) {
            $('#comment-container').empty();
            for (let i = 0; i < res.length; i++) {
                let tempHtml = ``;
                if (i % 2 === 0)
                    tempHtml = addCommentItem(res[i], "");
                else
                    tempHtml = addCommentItem(res[i], "class='even'");
                $('#comment-container').append(tempHtml);
            }
        }
    })
}

function addCommentItem(comment, flag) {
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
            receiveComments(res);
        }
    });

}

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
            receiveComments(res);
        }
    });
}

function showBoardContent(id) {
    receiveBoard(id);
    receiveComments(id);
    showBtnAndComment(id);

    $('#save-comment').off('click').on('click', function () {
    });
    $('#save-comment').click(function () {
        createComment(id);
    });

    $(".modal").fadeIn();

}


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
                receiveComments(boardId);
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

