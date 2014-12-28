var keyMirror = require('react/lib/keyMirror');


module.exports = {

    passage: keyMirror({
        CREATE_PASSAGE: null,
        UPDATE_PASSAGE: null,
        DELETE_PASSAGE: null,
        READ_PASSAGE: null,
        GET_ALL_PASSAGES: null,
        LIST_PASSAGES: null,
        SHOW_PASSAGE_FORM: null,
        SHOW_PASSAGE_EDIT_FORM: null,
        SET_CURRENT_PASSAGE: null,
        GET_PASSAGE_BY_ID: null,
        CHANGE_PASSAGE_VIEW: null,
        SET_CURRENT: null
    }),

    route: keyMirror({
        NAVIGATE: null
    }),

    student: keyMirror({
        CREATE_STUDENT: null,
        UPDATE_STUDENT: null,
        DELETE_STUDENT: null,
        READ_STUDENT: null,
        GET_ALL_STUDENTS: null,
        LIST_STUDENTS: null,
        SHOW_STUDENT_FORM: null,
        SHOW_STUDENT_EDIT_FORM: null,
        SET_CURRENT_STUDENT: null,
        CHANGE_STUDENT_VIEW: null
    }),

    test: keyMirror({
        CREATE_TEST: null,
        UPDATE_TEST: null,
        DELETE_TEST: null,
        READ_TEST: null,
        PASSAGE_SELECTION: null,
        TEST_VIEW_CHANGE: null,
        TEST_FOR_STUDENT: null,
        GET_ALL_TESTS: null,
        SET_CURRENT_TEST: null
    }),

    user: keyMirror({
        LOG_IN: null,
        LOG_OUT: null,
        USER_ERROR: null,
        SIGN_UP: null
    })

};