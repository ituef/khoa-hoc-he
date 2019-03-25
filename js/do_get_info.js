// Get the input field
// Execute a function when the user releases a key on the keyboard
const form = document.forms['submit-to-google-sheet'];
const loading = document.querySelector('.js-loading');
const successMessage = document.querySelector('.js-success-message');
const errorMessage = document.querySelector('.js-error-message');

form.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    event.preventDefault();
    form.classList.add('is-hidden'); 
    form.submit();
    loading.classList.remove('is-hidden');
  }
});

function stepSetSinhVien() {
    var masv = $.trim($("input[name='txtHoTen']").val());
    if(masv == ''){
        alert("VUI LÒNG HỌ VÀ TÊN SINH VIÊN");
        return false;
    }
    var hoten = $.trim($("input[name='txtMaSV']").val());
    if(hoten == ''){
        alert("VUI LÒNG NHẬP MÃ SINH VIÊN");
        return false;
    }
    var email = $.trim($("input[name='txtEmail']").val());
    if(email == ''){
        alert("VUI LÒNG NHẬP EMAIL");
        return false;
    }
    var phone = $.trim($("input[name='txtPhone']").val());
    if(phone == ''){
        alert("VUI LÒNG NHẬP SỐ ĐIỆN THOẠI");
        return false;
    }
    var lop = $.trim($("input[name='txtLop']").val());
    if(lop == ''){
        alert("VUI LÒNG NHẬP TÊN LỚP");
        return false;
    }
    doLoading()
        .then(doSetSinhVien)
        .then(doComplete);
}
function doLoading() {
    return new Promise(function (resolve, reject) {
        document.querySelector('.js-loading').classList.remove('is-hidden');
        resolve();
    });
}
function doSetSinhVien() {
    return new Promise(function (resolve, reject) {
        sinhVienSet()
        resolve();
    });
}

function doComplete() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            document.querySelector('.js-loading').classList.add('is-hidden');
        },1000);
        resolve();
    });
}




const scriptURL = 'https://script.google.com/macros/s/AKfycbxWC9jLRDHH1EoccReOVdgtGdOb5GRg-oMmbiqaGQ/exec';
form.addEventListener('submit', e => {
    e.preventDefault(); 
    document.querySelector('.js-loading').classList.remove('is-hidden');
    showLoadingIndicator();
    loading.classList.remove('is-hidden');
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => showSuccessMessage(response))
        .catch(error => showErrorMessage(error));
})

function showLoadingIndicator() {
    form.classList.add('is-hidden');
    loading.classList.remove('is-hidden');
}

function showSuccessMessage(response) {
    console.log('Success!', response);
    setTimeout(() => {
        successMessage.classList.remove('is-hidden');
        loading.classList.add('is-hidden');
    },1000);
}

function showErrorMessage(error) {
    console.error('Error!', error.message);
    setTimeout(() => {
        errorMessage.classList.remove('is-hidden');
        loading.classList.add('is-hidden');
    },1000);
}
