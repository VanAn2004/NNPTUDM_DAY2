// CRUD cho comments
async function LoadComments() {
    try {
        let res = await fetch('http://localhost:3000/comments');
        let data = await res.json();
        let body = document.getElementById("comment-body");
        body.innerHTML = "";
        for (const cmt of data) {
            let rowStyle = cmt.isDeleted ? 'style="text-decoration: line-through; color: gray;"' : '';
            body.innerHTML += `
            <tr ${rowStyle}>
                <td>${cmt.id}</td>
                <td>${cmt.text}</td>
                <td>${cmt.postId}</td>
                <td><input value="Delete" type="submit" onclick="DeleteComment('${cmt.id}')" />
                <input value="Edit" type="submit" onclick="EditComment('${cmt.id}','${cmt.text}','${cmt.postId}')" /></td>
            </tr>`
        }
    } catch (error) {}
}

async function SaveComment() {
    let id = document.getElementById("cmt_id_txt").value;
    let text = document.getElementById("cmt_text_txt").value;
    let postId = document.getElementById("cmt_postid_txt").value;
    let res;
    if (!id) {
        let resCmts = await fetch('http://localhost:3000/comments');
        let cmts = await resCmts.json();
        let maxId = cmts.reduce((max, c) => Math.max(max, parseInt(c.id)), 0);
        id = (maxId + 1).toString();
    }
    let getID = await fetch('http://localhost:3000/comments/' + id);
    if (getID.ok) {
        res = await fetch('http://localhost:3000/comments/' + id, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ text: text, postId: postId })
        });
    } else {
        res = await fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ id: id, text: text, postId: postId })
        });
    }
    if (res.ok) {
        LoadComments();
    }
}

async function DeleteComment(id) {
    let res = await fetch('http://localhost:3000/comments/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDeleted: true })
    });
    if (res.ok) {
        LoadComments();
    }
}

function EditComment(id, text, postId) {
    document.getElementById("cmt_id_txt").value = id;
    document.getElementById("cmt_text_txt").value = text;
    document.getElementById("cmt_postid_txt").value = postId;
}
//HTTP request Get,post,put,delete
async function Load() {
    try {
        let res = await fetch('http://localhost:3000/posts')
        let data = await res.json();
        let body = document.getElementById("table-body");
        body.innerHTML = "";
        for (const post of data) {
            let rowStyle = post.isDeleted ? 'style="text-decoration: line-through; color: gray;"' : '';
            body.innerHTML += `
            <tr ${rowStyle}>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.views}</td>
                <td><input value="Delete" type="submit" onclick="Delete(${post.id})" /></td>
            </tr>`
        }
    } catch (error) {

    }
}
async function Save() {
    let id = document.getElementById("id_txt").value;
    let title = document.getElementById("title_txt").value;
    let views = document.getElementById("views_txt").value;
    let res;
    if (!id) {
        // Lấy maxId hiện tại
        let resPosts = await fetch('http://localhost:3000/posts');
        let posts = await resPosts.json();
        let maxId = posts.reduce((max, p) => Math.max(max, parseInt(p.id)), 0);
        id = (maxId + 1).toString();
    }
    let getID = await fetch('http://localhost:3000/posts/' + id);
    if (getID.ok) {
        res = await fetch('http://localhost:3000/posts/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                views: views
            })
        });
    } else {
        res = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                title: title,
                views: views
            })
        });
    }
    if (res.ok) {
        console.log("them thanh cong");
        Load();
    }
}
async function Delete(id) {
    // Xoá mềm: cập nhật isDeleted:true
    let res = await fetch('http://localhost:3000/posts/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isDeleted: true })
    });
    if (res.ok) {
        console.log("Xoá mềm thành công");
        Load();
    }
}
Load();
LoadComments();