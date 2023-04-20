// Manipulación del DOM para mostrar la lista de usuarios
function showUserList(users) {
    /* const userList = $('#user-list');
    userList.empty();
    users.forEach((user) => {
        const item = $('<li></li>');
        item.text(`${user.name} (${user.id}) - ${user.phone}`);
        userList.append(item);
    }); */

    const userList = $('#tbody');
    userList.empty();
    users.forEach((user) => {
        const item = $(`
        <tr>
            <td class="text_left">${user.name}</td>
            <td class="text_left">${user.id}</td>
            <td class="text_left">${user.phone}</td>
        </tr>
    `);
        /* item.innerHTML()(`${user.name}, ${user.name}, ${user.name}`); */
        userList.append(item);
    });
    
}

// Manejo del envío del formulario
$('#user-form').submit((event) => {
    event.preventDefault();

    const name = $('#name').val();
    const id = $('#id').val();
    const phone = $('#phone').val();

    $.ajax({
        type: 'POST',
        url: '/api/users',
        data: { name, id, phone },
        success: () => {
            $('#name').val('');
            $('#id').val('');
            $('#phone').val('');
            loadUserList();
        },
        error: (xhr) => {
            alert(xhr.responseJSON.error);
        },
    });
});

// Carga de la lista de usuarios desde el servidor
function loadUserList() {
    $.ajax({
        type: 'GET',
        url: '/api/users',
        success: (users) => {
            showUserList(users);
        },
    });
}

// Inicialización de la aplicación
$(document).ready(() => {
    loadUserList();
});
