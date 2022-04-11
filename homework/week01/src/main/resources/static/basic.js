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

    return `
    <tr ${flag}>
        <td>${board.id}</td>
        <td>${board.title}</td>
        <td>${board.writer}</td>
        <td>${moment(board.createdAt).format('YY-MM-DD HH:mm:ss')}</td>
        <td>${board.views}</td>
    </tr>
    `;
}



function createModalInit() {
    jQuery.fn.serializeObject = function() {
        var obj = null;
        try {
            if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
                var arr = this.serializeArray();
                if (arr) {
                    obj = {};
                    jQuery.each(arr, function() {
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

    $(function(){

        $("#write-modal-button").click(function(){
            $(".modal").fadeIn();
        });

        $("#close-modal").click(function(){
            $(".modal").fadeOut();
        });

    });

    $('#save-board').click(function(){
        if (isValid()) {
            data = $('#form').serializeObject();
            // console.log(data);

            $.ajax({
                type: 'POST',
                url: '/api/boards',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (res){
                    alert("성공적으로 등록되었습니다.");
                    $(".modal").fadeOut();
                    window.location.reload();
                }
            });
        }
    });
}

function isValid(){
    if ($('#title').val().trim() === ''){
        alert("제목을 입력해주세요.");
        $('#title').focus();
        return false;
    }
    if ($('#writer').val().trim() === ''){
        alert("이름을 입력해주세요.");
        $('#writer').focus();
        return false;
    }
    if ($('#content').val().trim() === ''){
        alert("내용을 입력해주세요.");
        $('#content').focus();
        return false;
    }
    return true;
}