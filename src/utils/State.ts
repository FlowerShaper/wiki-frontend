import { reactive } from 'vue';

import Cookies from '@/utils/Cookies';
import WikiUser from '@/api/models/users/WikiUser';

export const state = reactive<{
    user?: WikiUser
}>({
    user: Cookies.Get('user')
});
