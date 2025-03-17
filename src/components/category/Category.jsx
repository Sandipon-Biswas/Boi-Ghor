import { useNavigate } from "react-router-dom";

// category 
const category = [
    {
        image: 'https://cdn-icons-png.flaticon.com/128/8457/8457958.png',
        name: 'উপন্যাস'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/14149/14149672.png',
        name: 'কবিতা'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/2015/2015171.png',
        name: 'ছোটগল্প'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/167/167755.png',
        name: 'প্রবন্ধ'
    },

    {
        image: 'https://cdn-icons-png.flaticon.com/128/6462/6462711.png',
        name: 'ইতিহাস'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/2178/2178197.png',
        name: 'জীবনী'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/3574/3574729.png',
        name: 'শিশু সাহিত্য'
    },


    {
        image: 'https://cdn-icons-png.flaticon.com/128/5408/5408783.png',
        name: 'বিজ্ঞান ও প্রযুক্তি'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/1585/1585601.png',
        name: 'ভ্রমণ কাহিনী'
    },

    {
        image: 'https://cdn-icons-png.flaticon.com/128/4833/4833969.png',
        name: 'মোটিভেশনাল বই'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/3839/3839447.png',
        name: 'রহস্য ও ভৌতিক গল্প'
    },
   
  ,
    {
        image: 'https://cdn-icons-png.flaticon.com/128/4634/4634814.png',
        name: 'ধর্মীয় বই'
    },
 
    {
        image: 'https://cdn-icons-png.flaticon.com/128/4354/4354980.png',
        name: 'ইসলামিক'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/5632/5632466.png',
        name: 'English'
    },















    
]

const Category = () => {
    const navigate = useNavigate();
    return (
        <div>
            {/*  */}
            <div class="text-center mt-5 mb-5"><h1 class="text-2xl font-semibold">All Category</h1></div>
            {/*  */}
            <div className="">
                {/* main 1 */}
                <div className=" overflow-x-scroll   ">
                    {/* main 2  */}
                    <div className="flex ">
                        {/* category  */}
                        {category.map((item, index) => {
                            return (
                                <div  key={index} className="px-3 lg:px-10 my-5  ">
                                    {/* Image  */}
                                    <div className="flex justify-center align-center">
                                    <div onClick={() => navigate(`/category/${item.name}`)}  className=" w-16 h-16  max-w-xs rounded-full  bg-cyan-900 transition-all hover:bg-cyan-400 cursor-pointer mb-1  " >
                                        <div className="flex justify-center align-center mb-12">
                                            {/* Image tag  */}
                                            <img src={item.image} alt="img" />
                                        </div>
                                    </div>
                                    </div>

                                    {/* Name Text  */}
                                    <h1 className='d-flex text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase '>{item.name}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* style  */}
        <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar {  -ms-overflow-style: none;  scrollbar-width: none;}.hide-scroll-bar::-webkit-scrollbar {  display: none;}" }} />
        </div>
    );
}

export default Category;