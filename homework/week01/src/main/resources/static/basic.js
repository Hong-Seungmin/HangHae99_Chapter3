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
        <td style="cursor:pointer;" onclick="showContent(${board.id})">${board.title}</td>
        <td>${board.writer}</td>
        <td>${time}</td>
        <td>${board.views}</td>
    </tr>
    `;
}

function showContent(id) {
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
        if (isValid()) {
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

    $('#delete-board').css("display", "inline");
    $('#delete-board').off('click').on('click', function () {
    });
    $('#delete-board').click(function () {
        if (isValid()) {
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

    $(".modal").fadeIn();

}


function createModalInit() {
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

    $(function () {

        $("#write-modal-button").click(function () {
            $('#save-board').off('click').on('click', function () {
            });
            $('#save-board').click(function () {
                if (isValid()) {
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
            $('#delete-board').css("display", "none");
            $(".modal").fadeIn();
        });

        $("#close-modal").click(function () {
            $(".modal").fadeOut();
            window.location.reload();
        });

    });


}

function isValid() {
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