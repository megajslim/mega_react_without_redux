import { isEmpty, isEqual } from 'lodash/lang'

//요청한 API 결과에 오류를 가지고 있는지
export const hasApiServiceError = result => {
    if (isEmpty(result)) {
        return { error: true, message: '오류' }
    } else {
        if (isEqual(result.errcode, 100)) {
            //성공
            return { error: false, message: null }
        } else {
            //오류
            return { error: true, message: result.errmsg }
        }
    }
}