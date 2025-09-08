
import SignUpForm from '../ui/SignUpForm/SignUpForm';

export default function SignUp() {

    return (
        <div className="flex mx-auto h-dvh">
            {/* <div className="relative flex-1">
                <Image
                    src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=100&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    fill
                    alt="Picture of the author"
                    className='object-cover -z-10'
                    priority
                />
            </div> */}

            <div className="relative flex-1 flex justify-center items-center">

                <SignUpForm className="relative w-4/5 max-w-lg ring ring-offset-4 ring-black rounded-[40px] bg-form-gradient" />
                <p className="text-center text-gray-500 text-xs absolute bottom-20 left-1/2 -translate-x-1/2">
                    &copy;2025 Workout App. All rights reserved.
                </p>
            </div>


        </div>
    );
}
