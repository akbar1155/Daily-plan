interface LogoIconProps {
    w?: number;
    h?: number;
}


const LogoIcon: React.FC<LogoIconProps> = ({ w, h }) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 30 30" fill="none">
            <path d="M17.8423 0.222656C18.6724 0.222656 19.4221 0.559138 19.967 1.10409C20.5118 1.64904 20.8483 2.39881 20.8483 3.22904C20.8483 4.05928 20.5118 4.80904 19.967 5.354C19.4221 5.89895 18.6724 6.23543 17.8423 6.23543C17.5643 6.23543 17.2937 6.19886 17.0341 6.12571V9.84529H18.431C19.2721 9.83066 19.6854 8.909 20.0767 8.03122C20.6691 6.71455 21.2323 5.45275 22.8669 5.28085C23.0388 5.25159 23.218 5.2333 23.3972 5.2333C24.2273 5.2333 24.977 5.56978 25.5219 6.11474C26.0668 6.65969 26.4032 7.40946 26.4032 8.23969C26.4032 9.06992 26.0668 9.81969 25.5219 10.3646C24.977 10.9096 24.2273 11.2461 23.3972 11.2461C22.5671 11.2461 21.8503 10.9242 21.3091 10.4012C20.7349 11.3046 19.9231 12.0032 18.442 12.0214H18.431L17.0341 12.0251V13.4222H23.4667C23.6166 13.0748 23.8324 12.7602 24.0993 12.4969C24.6442 11.952 25.3939 11.6155 26.224 11.6155C27.0541 11.6155 27.8038 11.952 28.3487 12.4969C28.8936 13.0419 29.23 13.7916 29.23 14.6219C29.23 15.4521 28.8936 16.2019 28.3487 16.7468C27.8038 17.2918 27.0541 17.6283 26.224 17.6283C25.3939 17.6283 24.6442 17.2918 24.0993 16.7468C23.7812 16.4286 23.5325 16.0373 23.3826 15.602H15.9443C15.3409 15.602 14.8545 15.112 14.8545 14.5121C14.8545 10.7523 14.8399 6.98886 14.8399 3.22904C14.8399 2.39881 15.1764 1.64904 15.7212 1.10409C16.2588 0.559138 17.0121 0.222656 17.8423 0.222656ZM11.5816 23.7837C10.7514 23.7837 9.8372 24.1055 9.29232 24.6468C8.74743 25.1918 8.41099 25.9415 8.41099 26.7718C8.41099 27.602 8.74743 28.3518 9.29232 28.8967C9.8372 29.4417 10.5869 29.7782 11.417 29.7782C12.2471 29.7782 12.9968 29.4417 13.5417 28.8967C14.1049 28.3335 14.3791 27.719 14.3791 27.0863V17.1345C14.3791 16.4615 14.0208 16.0446 13.2894 16.0446H11.3877C9.43128 16.0812 8.58287 17.588 7.90267 19.2009C7.37973 18.7547 6.69954 18.4841 5.95718 18.4841C5.12705 18.4841 4.37737 18.8206 3.83249 19.3655C3.2876 19.9105 2.95116 20.6602 2.95116 21.4905C2.95116 22.3207 3.2876 23.0705 3.83249 23.6154C4.37737 24.1604 5.12705 24.4969 5.95718 24.4969C6.7873 24.4969 7.53698 24.1604 8.08186 23.6154C8.71817 22.979 9.29963 21.5453 9.63607 20.7114C10.1151 19.5191 10.6271 18.2537 11.406 18.2244H12.1996V23.7032C12.1996 23.7471 12.1996 23.7946 12.1996 23.8458C11.9985 23.802 11.7937 23.78 11.5779 23.78L11.5816 23.7837ZM5.37572 20.9089C5.52565 20.759 5.73044 20.6676 5.95718 20.6676C6.18391 20.6676 6.39235 20.759 6.53863 20.9089C6.68857 21.0589 6.77999 21.2637 6.77999 21.4905C6.77999 21.7172 6.68857 21.9257 6.53863 22.072C6.3887 22.222 6.18391 22.3134 5.95718 22.3134C5.73044 22.3134 5.522 22.222 5.37572 22.072C5.22578 21.922 5.13436 21.7172 5.13436 21.4905C5.13436 21.2637 5.22578 21.0552 5.37572 20.9089ZM10.8356 26.1902C10.9855 26.0403 11.1903 25.9488 11.417 25.9488C11.6437 25.9488 11.8522 26.0403 11.9985 26.1902C12.1484 26.3402 12.2398 26.545 12.2398 26.7718C12.2398 26.9985 12.1484 27.207 11.9985 27.3533C11.8485 27.4996 11.6437 27.5947 11.417 27.5947C11.1903 27.5947 10.9818 27.5032 10.8356 27.3533C10.6856 27.2033 10.5942 26.9985 10.5942 26.7718C10.5942 26.545 10.6856 26.3365 10.8356 26.1902ZM11.3877 0.222656C10.5613 0.222656 9.80795 0.559138 9.26306 1.10409C8.71817 1.64904 8.38173 2.39881 8.38173 3.22904C8.38173 4.05928 8.71817 4.80904 9.26306 5.354C9.80795 5.89895 10.5576 6.23543 11.3877 6.23543C11.6657 6.23543 11.9363 6.19886 12.1959 6.12571V9.84529H10.799C9.95788 9.83066 9.54465 8.909 9.15335 8.03122C8.56093 6.71455 7.99775 5.45275 6.3631 5.28085C6.19122 5.25159 6.01203 5.2333 5.83284 5.2333C5.00271 5.2333 4.25304 5.56978 3.70815 6.11474C3.16326 6.65969 2.82682 7.40946 2.82682 8.23969C2.82682 9.06992 3.16326 9.81969 3.70815 10.3646C4.25304 10.9096 5.00271 11.2461 5.83284 11.2461C6.66297 11.2461 7.37973 10.9242 7.92096 10.4012C8.4951 11.3046 9.30694 12.0032 10.788 12.0214H10.8026L12.1996 12.0251V13.4222H5.76336C5.61342 13.0748 5.39766 12.7602 5.1307 12.4969C4.58582 11.952 3.83614 11.6155 3.00601 11.6155C2.17589 11.6155 1.42621 11.952 0.881325 12.4969C0.33644 13.0419 0 13.7916 0 14.6219C0 15.4521 0.33644 16.2019 0.881325 16.7468C1.42621 17.2918 2.17589 17.6283 3.00601 17.6283C3.83614 17.6283 4.58582 17.2918 5.1307 16.7468C5.44886 16.4286 5.69753 16.0373 5.84747 15.602H13.2857C13.8891 15.602 14.3755 15.112 14.3755 14.5121C14.3755 10.7523 14.3938 6.98886 14.3938 3.22904C14.3938 2.39881 14.0573 1.64904 13.5124 1.10409C12.9712 0.559138 12.2179 0.222656 11.3877 0.222656ZM3.81786 14.4719C3.81786 14.4719 3.81786 14.5012 3.81786 14.5121C3.81786 14.567 3.82152 14.6255 3.82883 14.6767C3.8142 14.8815 3.72643 15.0644 3.59113 15.2034C3.44119 15.3533 3.2364 15.4448 3.00967 15.4448C2.78294 15.4448 2.57449 15.3533 2.42822 15.2034C2.27828 15.0534 2.18686 14.8486 2.18686 14.6219C2.18686 14.3951 2.27828 14.1866 2.42822 14.0403C2.57815 13.8904 2.78294 13.7989 3.00967 13.7989C3.2364 13.7989 3.44485 13.8904 3.59113 14.0403C3.70815 14.1537 3.7886 14.3037 3.81786 14.4719ZM5.24773 7.65816C5.39766 7.50821 5.60245 7.41677 5.82918 7.41677C6.05591 7.41677 6.26436 7.50821 6.41064 7.65816C6.56057 7.80812 6.652 8.01293 6.652 8.23969C6.652 8.46645 6.56057 8.67492 6.41064 8.82122C6.2607 8.97117 6.05591 9.06261 5.82918 9.06261C5.60245 9.06261 5.394 8.97117 5.24773 8.82122C5.09779 8.67126 5.00637 8.46645 5.00637 8.23969C5.00637 8.01293 5.09779 7.80446 5.24773 7.65816ZM10.8063 2.64752C10.9562 2.49756 11.161 2.40613 11.3877 2.40613C11.6145 2.40613 11.8229 2.49756 11.9692 2.64752C12.1191 2.79747 12.2106 3.00228 12.2106 3.22904C12.2106 3.4558 12.1191 3.66428 11.9692 3.81057C11.8193 3.96053 11.6145 4.05196 11.3877 4.05196C11.161 4.05196 10.9526 3.96053 10.8063 3.81057C10.6564 3.66062 10.5649 3.4558 10.5649 3.22904C10.5649 3.00228 10.6564 2.79381 10.8063 2.64752ZM17.6521 23.7837C18.4822 23.7837 19.3965 24.1055 19.9414 24.6468C20.4862 25.1918 20.8227 25.9415 20.8227 26.7718C20.8227 27.602 20.4862 28.3518 19.9414 28.8967C19.3965 29.4417 18.6468 29.7782 17.8167 29.7782C16.9865 29.7782 16.2369 29.4417 15.692 28.8967C15.1288 28.3335 14.8545 27.719 14.8545 27.0863V17.1345C14.8545 16.4615 15.2129 16.0446 15.9443 16.0446H17.8459C19.8024 16.0812 20.6508 17.588 21.331 19.2009C21.8539 18.7547 22.5341 18.4841 23.2765 18.4841C24.1066 18.4841 24.8563 18.8206 25.4012 19.3655C25.9461 19.9105 26.2825 20.6602 26.2825 21.4905C26.2825 22.3207 25.9461 23.0705 25.4012 23.6154C24.8563 24.1604 24.1066 24.4969 23.2765 24.4969C22.4464 24.4969 21.6967 24.1604 21.1518 23.6154C20.5155 22.979 19.934 21.5453 19.5976 20.7114C19.1185 19.5191 18.6066 18.2537 17.8276 18.2244H17.0341V23.7032C17.0341 23.7471 17.0341 23.7946 17.0341 23.8458C17.2352 23.802 17.44 23.78 17.6558 23.78L17.6521 23.7837ZM23.858 20.9089C23.708 20.759 23.5032 20.6676 23.2765 20.6676C23.0498 20.6676 22.8413 20.759 22.695 20.9089C22.5451 21.0589 22.4537 21.2637 22.4537 21.4905C22.4537 21.7172 22.5451 21.9257 22.695 22.072C22.845 22.2183 23.0498 22.3134 23.2765 22.3134C23.5032 22.3134 23.7117 22.222 23.858 22.072C24.0042 21.922 24.0993 21.7172 24.0993 21.4905C24.0993 21.2637 24.0079 21.0552 23.858 20.9089ZM18.3981 26.1902C18.2482 26.0403 18.0434 25.9488 17.8167 25.9488C17.5899 25.9488 17.3815 26.0403 17.2352 26.1902C17.0853 26.3402 16.9939 26.545 16.9939 26.7718C16.9939 26.9985 17.0853 27.207 17.2352 27.3533C17.3851 27.5032 17.5899 27.5947 17.8167 27.5947C18.0434 27.5947 18.2518 27.5032 18.3981 27.3533C18.5481 27.2033 18.6395 26.9985 18.6395 26.7718C18.6395 26.545 18.5481 26.3365 18.3981 26.1902ZM25.4122 14.4719C25.4122 14.4719 25.4122 14.5012 25.4122 14.5121C25.4122 14.567 25.4085 14.6255 25.4012 14.6767C25.4158 14.8815 25.5036 15.0644 25.6389 15.2034C25.7888 15.3533 25.9936 15.4448 26.2203 15.4448C26.4471 15.4448 26.6555 15.3533 26.8018 15.2034C26.9481 15.0534 27.0432 14.8486 27.0432 14.6219C27.0432 14.3951 26.9517 14.1866 26.8018 14.0403C26.6519 13.8904 26.4471 13.7989 26.2203 13.7989C25.9936 13.7989 25.7852 13.8904 25.6389 14.0403C25.5219 14.1537 25.4414 14.3037 25.4122 14.4719ZM23.9823 7.65816C23.8324 7.50821 23.6276 7.41677 23.4008 7.41677C23.1741 7.41677 22.9657 7.50821 22.8194 7.65816C22.6694 7.80812 22.578 8.01293 22.578 8.23969C22.578 8.46645 22.6694 8.67492 22.8194 8.82122C22.9693 8.97117 23.1741 9.06261 23.4008 9.06261C23.6276 9.06261 23.836 8.97117 23.9823 8.82122C24.1322 8.67126 24.2237 8.46645 24.2237 8.23969C24.2237 8.01293 24.1322 7.80446 23.9823 7.65816ZM18.4237 2.64752C18.2738 2.49756 18.069 2.40613 17.8423 2.40613C17.6155 2.40613 17.4071 2.49756 17.2608 2.64752C17.1145 2.79747 17.0195 3.00228 17.0195 3.22904C17.0195 3.4558 17.1109 3.66428 17.2608 3.81057C17.4107 3.96053 17.6155 4.05196 17.8423 4.05196C18.069 4.05196 18.2774 3.96053 18.4237 3.81057C18.5737 3.66062 18.6651 3.4558 18.6651 3.22904C18.6651 3.00228 18.5737 2.79381 18.4237 2.64752Z" fill="url(#paint0_radial_316_3480)" />
            <path d="M17.8423 0.222656C18.6724 0.222656 19.4221 0.559138 19.967 1.10409C20.5118 1.64904 20.8483 2.39881 20.8483 3.22904C20.8483 4.05928 20.5118 4.80904 19.967 5.354C19.4221 5.89895 18.6724 6.23543 17.8423 6.23543C17.5643 6.23543 17.2937 6.19886 17.0341 6.12571V9.84529H18.431C19.2721 9.83066 19.6854 8.909 20.0767 8.03122C20.6691 6.71455 21.2323 5.45275 22.8669 5.28085C23.0388 5.25159 23.218 5.2333 23.3972 5.2333C24.2273 5.2333 24.977 5.56978 25.5219 6.11474C26.0668 6.65969 26.4032 7.40946 26.4032 8.23969C26.4032 9.06992 26.0668 9.81969 25.5219 10.3646C24.977 10.9096 24.2273 11.2461 23.3972 11.2461C22.5671 11.2461 21.8503 10.9242 21.3091 10.4012C20.7349 11.3046 19.9231 12.0032 18.442 12.0214H18.431L17.0341 12.0251V13.4222H23.4667C23.6166 13.0748 23.8324 12.7602 24.0993 12.4969C24.6442 11.952 25.3939 11.6155 26.224 11.6155C27.0541 11.6155 27.8038 11.952 28.3487 12.4969C28.8936 13.0419 29.23 13.7916 29.23 14.6219C29.23 15.4521 28.8936 16.2019 28.3487 16.7468C27.8038 17.2918 27.0541 17.6283 26.224 17.6283C25.3939 17.6283 24.6442 17.2918 24.0993 16.7468C23.7812 16.4286 23.5325 16.0373 23.3826 15.602H15.9443C15.3409 15.602 14.8545 15.112 14.8545 14.5121C14.8545 10.7523 14.8399 6.98886 14.8399 3.22904C14.8399 2.39881 15.1764 1.64904 15.7212 1.10409C16.2588 0.559138 17.0121 0.222656 17.8423 0.222656ZM11.5816 23.7837C10.7514 23.7837 9.8372 24.1055 9.29232 24.6468C8.74743 25.1918 8.41099 25.9415 8.41099 26.7718C8.41099 27.602 8.74743 28.3518 9.29232 28.8967C9.8372 29.4417 10.5869 29.7782 11.417 29.7782C12.2471 29.7782 12.9968 29.4417 13.5417 28.8967C14.1049 28.3335 14.3791 27.719 14.3791 27.0863V17.1345C14.3791 16.4615 14.0208 16.0446 13.2894 16.0446H11.3877C9.43128 16.0812 8.58287 17.588 7.90267 19.2009C7.37973 18.7547 6.69954 18.4841 5.95718 18.4841C5.12705 18.4841 4.37737 18.8206 3.83249 19.3655C3.2876 19.9105 2.95116 20.6602 2.95116 21.4905C2.95116 22.3207 3.2876 23.0705 3.83249 23.6154C4.37737 24.1604 5.12705 24.4969 5.95718 24.4969C6.7873 24.4969 7.53698 24.1604 8.08186 23.6154C8.71817 22.979 9.29963 21.5453 9.63607 20.7114C10.1151 19.5191 10.6271 18.2537 11.406 18.2244H12.1996V23.7032C12.1996 23.7471 12.1996 23.7946 12.1996 23.8458C11.9985 23.802 11.7937 23.78 11.5779 23.78L11.5816 23.7837ZM5.37572 20.9089C5.52565 20.759 5.73044 20.6676 5.95718 20.6676C6.18391 20.6676 6.39235 20.759 6.53863 20.9089C6.68857 21.0589 6.77999 21.2637 6.77999 21.4905C6.77999 21.7172 6.68857 21.9257 6.53863 22.072C6.3887 22.222 6.18391 22.3134 5.95718 22.3134C5.73044 22.3134 5.522 22.222 5.37572 22.072C5.22578 21.922 5.13436 21.7172 5.13436 21.4905C5.13436 21.2637 5.22578 21.0552 5.37572 20.9089ZM10.8356 26.1902C10.9855 26.0403 11.1903 25.9488 11.417 25.9488C11.6437 25.9488 11.8522 26.0403 11.9985 26.1902C12.1484 26.3402 12.2398 26.545 12.2398 26.7718C12.2398 26.9985 12.1484 27.207 11.9985 27.3533C11.8485 27.4996 11.6437 27.5947 11.417 27.5947C11.1903 27.5947 10.9818 27.5032 10.8356 27.3533C10.6856 27.2033 10.5942 26.9985 10.5942 26.7718C10.5942 26.545 10.6856 26.3365 10.8356 26.1902ZM11.3877 0.222656C10.5613 0.222656 9.80795 0.559138 9.26306 1.10409C8.71817 1.64904 8.38173 2.39881 8.38173 3.22904C8.38173 4.05928 8.71817 4.80904 9.26306 5.354C9.80795 5.89895 10.5576 6.23543 11.3877 6.23543C11.6657 6.23543 11.9363 6.19886 12.1959 6.12571V9.84529H10.799C9.95788 9.83066 9.54465 8.909 9.15335 8.03122C8.56093 6.71455 7.99775 5.45275 6.3631 5.28085C6.19122 5.25159 6.01203 5.2333 5.83284 5.2333C5.00271 5.2333 4.25304 5.56978 3.70815 6.11474C3.16326 6.65969 2.82682 7.40946 2.82682 8.23969C2.82682 9.06992 3.16326 9.81969 3.70815 10.3646C4.25304 10.9096 5.00271 11.2461 5.83284 11.2461C6.66297 11.2461 7.37973 10.9242 7.92096 10.4012C8.4951 11.3046 9.30694 12.0032 10.788 12.0214H10.8026L12.1996 12.0251V13.4222H5.76336C5.61342 13.0748 5.39766 12.7602 5.1307 12.4969C4.58582 11.952 3.83614 11.6155 3.00601 11.6155C2.17589 11.6155 1.42621 11.952 0.881325 12.4969C0.33644 13.0419 0 13.7916 0 14.6219C0 15.4521 0.33644 16.2019 0.881325 16.7468C1.42621 17.2918 2.17589 17.6283 3.00601 17.6283C3.83614 17.6283 4.58582 17.2918 5.1307 16.7468C5.44886 16.4286 5.69753 16.0373 5.84747 15.602H13.2857C13.8891 15.602 14.3755 15.112 14.3755 14.5121C14.3755 10.7523 14.3938 6.98886 14.3938 3.22904C14.3938 2.39881 14.0573 1.64904 13.5124 1.10409C12.9712 0.559138 12.2179 0.222656 11.3877 0.222656ZM3.81786 14.4719C3.81786 14.4719 3.81786 14.5012 3.81786 14.5121C3.81786 14.567 3.82152 14.6255 3.82883 14.6767C3.8142 14.8815 3.72643 15.0644 3.59113 15.2034C3.44119 15.3533 3.2364 15.4448 3.00967 15.4448C2.78294 15.4448 2.57449 15.3533 2.42822 15.2034C2.27828 15.0534 2.18686 14.8486 2.18686 14.6219C2.18686 14.3951 2.27828 14.1866 2.42822 14.0403C2.57815 13.8904 2.78294 13.7989 3.00967 13.7989C3.2364 13.7989 3.44485 13.8904 3.59113 14.0403C3.70815 14.1537 3.7886 14.3037 3.81786 14.4719ZM5.24773 7.65816C5.39766 7.50821 5.60245 7.41677 5.82918 7.41677C6.05591 7.41677 6.26436 7.50821 6.41064 7.65816C6.56057 7.80812 6.652 8.01293 6.652 8.23969C6.652 8.46645 6.56057 8.67492 6.41064 8.82122C6.2607 8.97117 6.05591 9.06261 5.82918 9.06261C5.60245 9.06261 5.394 8.97117 5.24773 8.82122C5.09779 8.67126 5.00637 8.46645 5.00637 8.23969C5.00637 8.01293 5.09779 7.80446 5.24773 7.65816ZM10.8063 2.64752C10.9562 2.49756 11.161 2.40613 11.3877 2.40613C11.6145 2.40613 11.8229 2.49756 11.9692 2.64752C12.1191 2.79747 12.2106 3.00228 12.2106 3.22904C12.2106 3.4558 12.1191 3.66428 11.9692 3.81057C11.8193 3.96053 11.6145 4.05196 11.3877 4.05196C11.161 4.05196 10.9526 3.96053 10.8063 3.81057C10.6564 3.66062 10.5649 3.4558 10.5649 3.22904C10.5649 3.00228 10.6564 2.79381 10.8063 2.64752ZM17.6521 23.7837C18.4822 23.7837 19.3965 24.1055 19.9414 24.6468C20.4862 25.1918 20.8227 25.9415 20.8227 26.7718C20.8227 27.602 20.4862 28.3518 19.9414 28.8967C19.3965 29.4417 18.6468 29.7782 17.8167 29.7782C16.9865 29.7782 16.2369 29.4417 15.692 28.8967C15.1288 28.3335 14.8545 27.719 14.8545 27.0863V17.1345C14.8545 16.4615 15.2129 16.0446 15.9443 16.0446H17.8459C19.8024 16.0812 20.6508 17.588 21.331 19.2009C21.8539 18.7547 22.5341 18.4841 23.2765 18.4841C24.1066 18.4841 24.8563 18.8206 25.4012 19.3655C25.9461 19.9105 26.2825 20.6602 26.2825 21.4905C26.2825 22.3207 25.9461 23.0705 25.4012 23.6154C24.8563 24.1604 24.1066 24.4969 23.2765 24.4969C22.4464 24.4969 21.6967 24.1604 21.1518 23.6154C20.5155 22.979 19.934 21.5453 19.5976 20.7114C19.1185 19.5191 18.6066 18.2537 17.8276 18.2244H17.0341V23.7032C17.0341 23.7471 17.0341 23.7946 17.0341 23.8458C17.2352 23.802 17.44 23.78 17.6558 23.78L17.6521 23.7837ZM23.858 20.9089C23.708 20.759 23.5032 20.6676 23.2765 20.6676C23.0498 20.6676 22.8413 20.759 22.695 20.9089C22.5451 21.0589 22.4537 21.2637 22.4537 21.4905C22.4537 21.7172 22.5451 21.9257 22.695 22.072C22.845 22.2183 23.0498 22.3134 23.2765 22.3134C23.5032 22.3134 23.7117 22.222 23.858 22.072C24.0042 21.922 24.0993 21.7172 24.0993 21.4905C24.0993 21.2637 24.0079 21.0552 23.858 20.9089ZM18.3981 26.1902C18.2482 26.0403 18.0434 25.9488 17.8167 25.9488C17.5899 25.9488 17.3815 26.0403 17.2352 26.1902C17.0853 26.3402 16.9939 26.545 16.9939 26.7718C16.9939 26.9985 17.0853 27.207 17.2352 27.3533C17.3851 27.5032 17.5899 27.5947 17.8167 27.5947C18.0434 27.5947 18.2518 27.5032 18.3981 27.3533C18.5481 27.2033 18.6395 26.9985 18.6395 26.7718C18.6395 26.545 18.5481 26.3365 18.3981 26.1902ZM25.4122 14.4719C25.4122 14.4719 25.4122 14.5012 25.4122 14.5121C25.4122 14.567 25.4085 14.6255 25.4012 14.6767C25.4158 14.8815 25.5036 15.0644 25.6389 15.2034C25.7888 15.3533 25.9936 15.4448 26.2203 15.4448C26.4471 15.4448 26.6555 15.3533 26.8018 15.2034C26.9481 15.0534 27.0432 14.8486 27.0432 14.6219C27.0432 14.3951 26.9517 14.1866 26.8018 14.0403C26.6519 13.8904 26.4471 13.7989 26.2203 13.7989C25.9936 13.7989 25.7852 13.8904 25.6389 14.0403C25.5219 14.1537 25.4414 14.3037 25.4122 14.4719ZM23.9823 7.65816C23.8324 7.50821 23.6276 7.41677 23.4008 7.41677C23.1741 7.41677 22.9657 7.50821 22.8194 7.65816C22.6694 7.80812 22.578 8.01293 22.578 8.23969C22.578 8.46645 22.6694 8.67492 22.8194 8.82122C22.9693 8.97117 23.1741 9.06261 23.4008 9.06261C23.6276 9.06261 23.836 8.97117 23.9823 8.82122C24.1322 8.67126 24.2237 8.46645 24.2237 8.23969C24.2237 8.01293 24.1322 7.80446 23.9823 7.65816ZM18.4237 2.64752C18.2738 2.49756 18.069 2.40613 17.8423 2.40613C17.6155 2.40613 17.4071 2.49756 17.2608 2.64752C17.1145 2.79747 17.0195 3.00228 17.0195 3.22904C17.0195 3.4558 17.1109 3.66428 17.2608 3.81057C17.4107 3.96053 17.6155 4.05196 17.8423 4.05196C18.069 4.05196 18.2774 3.96053 18.4237 3.81057C18.5737 3.66062 18.6651 3.4558 18.6651 3.22904C18.6651 3.00228 18.5737 2.79381 18.4237 2.64752Z" fill="url(#paint1_radial_316_3480)" />
            <defs>
                <radialGradient id="paint0_radial_316_3480" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8.65869 15.0004) scale(5.95267 5.78915)">
                    <stop stopColor="#41BDD8" />
                    <stop offset="0.58" stopColor="#5B9BEC" />
                    <stop offset="1" stopColor="#757AFF" />
                </radialGradient>
                <radialGradient id="paint1_radial_316_3480" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.9641 15.3784) rotate(-180) scale(9.97781 9.70371)">
                    <stop stopColor="#52E0FF" />
                    <stop offset="0.559604" stopColor="#5B9BEC" />
                    <stop offset="1" stopColor="#757AFF" />
                </radialGradient>
            </defs>
        </svg>
    )
}
export default LogoIcon;
