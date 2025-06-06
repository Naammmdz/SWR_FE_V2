import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Shield, 
  Users, 
  Calendar, 
  FileText, 
  Activity,
  CheckCircle,
  Star,
  Award,
  Clock,
  Phone,
  Mail,
  MapPin,
  Stethoscope,
  BookOpen,
  TrendingUp,
  ChevronRight,
  PlayCircle
} from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className='min-h-screen bg-white'>
      {/* Navigation Header */}
      <header className='fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm border-b z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            <div className='flex items-center'>
              <div className='bg-blue-600 p-2 rounded-lg mr-3'>
                <Stethoscope className='h-6 w-6 text-white' />
              </div>              <div>
                <span className='text-xl font-bold text-gray-900'>Trường THPT Nguyễn Du</span>
                <div className='text-sm text-gray-600'>Hệ thống quản lý y tế</div>
              </div>
            </div>
            <nav className='hidden md:flex space-x-8'>
              <a href='#' className='text-gray-700 hover:text-blue-600 font-medium transition-colors'>Trang chủ</a>
              <a href='#services' className='text-gray-700 hover:text-blue-600 font-medium transition-colors'>Dịch vụ</a>
              <a href='#about' className='text-gray-700 hover:text-blue-600 font-medium transition-colors'>Về chúng tôi</a>
              <a href='#contact' className='text-gray-700 hover:text-blue-600 font-medium transition-colors'>Liên hệ</a>
            </nav>
            <div className='flex items-center space-x-4'>
              <button className='text-gray-700 hover:text-blue-600 font-medium transition-colors'>
                Đăng ký
              </button>
              <Link
                to='/login'
                className='bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium'
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='pt-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen flex items-center'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div className='lg:pr-8'>              <div className='inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6'>
                <Heart className='h-4 w-4 mr-2' />
                Hệ thống y tế trường THPT Nguyễn Du
              </div>
              <h1 className='text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
                Chăm sóc sức khỏe 
                <span className='text-blue-600 block'>học sinh</span>
                <span className='text-gray-600'>toàn diện</span>
              </h1>
              <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
                Hệ thống quản lý y tế hiện đại của trường THPT Nguyễn Du. 
                Kết nối giáo viên, phụ huynh và đội ngũ y tế để chăm sóc sức khỏe học sinh một cách tốt nhất.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 mb-12'>                <Link
                  to='/login'
                  className='bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-center inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                >
                  Đăng nhập hệ thống
                  <ChevronRight className='h-5 w-5 ml-2' />
                </Link>
                <button className='border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold inline-flex items-center justify-center hover:border-gray-400'>
                  <PlayCircle className='h-5 w-5 mr-2' />
                  Tìm hiểu thêm
                </button>
              </div>
              
              {/* Trust indicators */}              <div className='flex items-center space-x-8 text-sm text-gray-600'>
                <div className='flex items-center'>
                  <CheckCircle className='h-5 w-5 text-green-500 mr-2' />
                  <span>An toàn tuyệt đối</span>
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='h-5 w-5 text-green-500 mr-2' />
                  <span>Y tá chuyên nghiệp</span>
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='h-5 w-5 text-green-500 mr-2' />
                  <span>Theo dõi liên tục</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image/Dashboard Preview */}
            <div className='relative'>
              <div className='bg-white rounded-3xl shadow-2xl p-8 relative z-10'>                <div className='mb-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-lg font-semibold text-gray-900'>Bảng theo dõi Y tế</h3>
                    <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='bg-blue-50 p-4 rounded-xl'>
                      <div className='text-2xl font-bold text-blue-600'>1,847</div>
                      <div className='text-sm text-gray-600'>Học sinh</div>
                    </div>
                    <div className='bg-green-50 p-4 rounded-xl'>
                      <div className='text-2xl font-bold text-green-600'>98.5%</div>
                      <div className='text-sm text-gray-600'>Sức khỏe tốt</div>
                    </div>
                  </div>
                </div>
                
                <div className='space-y-3'>
                  <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                    <div className='flex items-center'>
                      <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
                      <span className='text-sm text-gray-700'>Khám sức khỏe định kỳ</span>
                    </div>
                    <span className='text-xs text-gray-500'>Hoàn thành</span>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-yellow-50 rounded-lg'>
                    <div className='flex items-center'>
                      <div className='w-2 h-2 bg-yellow-500 rounded-full mr-3'></div>
                      <span className='text-sm text-gray-700'>Tiêm chủng vaccine</span>
                    </div>
                    <span className='text-xs text-gray-500'>Đang thực hiện</span>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-blue-50 rounded-lg'>
                    <div className='flex items-center'>
                      <div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
                      <span className='text-sm text-gray-700'>Cập nhật hồ sơ</span>
                    </div>
                    <span className='text-xs text-gray-500'>Sắp đến hạn</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className='absolute -top-4 -right-4 bg-blue-600 text-white p-4 rounded-2xl shadow-lg z-20'>
                <Heart className='h-6 w-6' />
              </div>
              <div className='absolute -bottom-4 -left-4 bg-green-500 text-white p-4 rounded-2xl shadow-lg z-20'>
                <Shield className='h-6 w-6' />
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Services Overview */}
      <section id='services' className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <div className='inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4'>
              <Stethoscope className='h-4 w-4 mr-2' />
              Dịch vụ chăm sóc sức khỏe
            </div>            <h2 className='text-4xl font-bold text-gray-900 mb-6'>
              Hệ thống y tế cho từng thành viên trường học
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Từ y tá trường, phụ huynh đến giáo viên - mỗi vai trò đều có những công cụ riêng biệt 
              để đảm bảo sức khỏe tốt nhất cho học sinh THPT Nguyễn Du
            </p>
          </div>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                icon: Heart,
                title: 'Y tá trường học',
                description: 'Quản lý hồ sơ sức khỏe, theo dõi tình trạng bệnh tật và xử lý các trường hợp khẩn cấp',
                color: 'bg-red-50 text-red-600',
                features: ['Hồ sơ bệnh án', 'Quản lý thuốc', 'Sơ cứu khẩn cấp']
              },
              {
                icon: Users,
                title: 'Phụ huynh',
                description: 'Theo dõi sức khỏe con em, nhận thông báo và tương tác với đội ngũ y tế trường',
                color: 'bg-blue-50 text-blue-600',
                features: ['Theo dõi sức khỏe', 'Nhận thông báo', 'Đặt lịch khám']
              },
              {
                icon: Shield,
                title: 'Ban quản lý',
                description: 'Giám sát toàn bộ hệ thống, tạo báo cáo và đưa ra quyết định dựa trên dữ liệu',
                color: 'bg-green-50 text-green-600',
                features: ['Báo cáo thống kê', 'Quản lý chiến dịch', 'Giám sát hệ thống']
              },
              {
                icon: FileText,
                title: 'Giáo viên',
                description: 'Hỗ trợ học sinh trong các vấn đề sức khỏe và kết nối với đội ngũ y tế',
                color: 'bg-yellow-50 text-yellow-600',
                features: ['Báo cáo sức khỏe', 'Hỗ trợ học sinh', 'Liên lạc y tế']
              },
              {
                icon: Activity,
                title: 'Chuyên gia y tế',
                description: 'Tư vấn chuyên môn, đánh giá sức khỏe và đưa ra khuyến nghị điều trị',
                color: 'bg-purple-50 text-purple-600',
                features: ['Tư vấn chuyên môn', 'Đánh giá sức khỏe', 'Kế hoạch điều trị']
              },
              {
                icon: Calendar,
                title: 'Lập lịch thông minh',
                description: 'Tự động lập lịch khám, tiêm chủng và nhắc nhở các hoạt động y tế',
                color: 'bg-indigo-50 text-indigo-600',
                features: ['Lịch tự động', 'Nhắc nhở', 'Đồng bộ lịch']
              }
            ].map((service, index) => (
              <div key={index} className='group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2'>
                <div className={'w-16 h-16 rounded-xl flex items-center justify-center mb-6 ' + service.color}>
                  <service.icon className='h-8 w-8' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-4'>{service.title}</h3>
                <p className='text-gray-600 mb-6'>{service.description}</p>
                <ul className='space-y-2'>
                  {service.features.map((feature, idx) => (
                    <li key={idx} className='flex items-center text-sm text-gray-600'>
                      <CheckCircle className='h-4 w-4 text-green-500 mr-2 flex-shrink-0' />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className='mt-6'>
                  <button className='text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform duration-300'>
                    Tìm hiểu thêm
                    <ChevronRight className='h-4 w-4 ml-1' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* Why Choose Us */}
      <section className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div>
              <div className='inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6'>
                <Award className='h-4 w-4 mr-2' />
                Tại sao chọn chúng tôi
              </div>              <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                Tại sao chọn hệ thống y tế THPT Nguyễn Du
              </h2>
              <p className='text-xl text-gray-600 mb-8'>
                Chúng tôi áp dụng công nghệ hiện đại kết hợp với đội ngũ y tế chuyên nghiệp 
                để mang đến dịch vụ chăm sóc sức khỏe tốt nhất cho học sinh của trường.
              </p>
              
              <div className='space-y-6'>
                {[
                  {
                    icon: Shield,
                    title: 'Bảo mật tuyệt đối',
                    description: 'Dữ liệu được mã hóa end-to-end, tuân thủ các tiêu chuẩn bảo mật quốc tế'
                  },
                  {
                    icon: TrendingUp,
                    title: 'Phân tích thông minh',
                    description: 'AI hỗ trợ phân tích dữ liệu sức khỏe và dự đoán các vấn đề tiềm ẩn'
                  },
                  {
                    icon: Clock,
                    title: 'Phản hồi nhanh chóng',
                    description: 'Hệ thống cảnh báo tức thời và hỗ trợ khẩn cấp 24/7'
                  }
                ].map((item, index) => (
                  <div key={index} className='flex items-start'>
                    <div className='bg-blue-100 p-3 rounded-xl mr-4 flex-shrink-0'>
                      <item.icon className='h-6 w-6 text-blue-600' />
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-900 mb-2'>{item.title}</h3>
                      <p className='text-gray-600'>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className='relative'>
              <div className='bg-white rounded-3xl shadow-2xl p-8'>
                <h3 className='text-xl font-semibold text-gray-900 mb-6'>Thống kê hệ thống</h3>                <div className='grid grid-cols-2 gap-6'>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-blue-600 mb-2'>1,847</div>
                    <div className='text-sm text-gray-600'>Học sinh</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-green-600 mb-2'>45</div>
                    <div className='text-sm text-gray-600'>Lớp học</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-purple-600 mb-2'>98.5%</div>
                    <div className='text-sm text-gray-600'>Hài lòng</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-yellow-600 mb-2'>7</div>
                    <div className='text-sm text-gray-600'>Y tá</div>
                  </div>
                </div>
                
                <div className='mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <div className='text-sm text-gray-600'>Độ tin cậy hệ thống</div>
                      <div className='text-2xl font-bold text-gray-900'>99.9%</div>
                    </div>
                    <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                      <TrendingUp className='h-8 w-8 text-white' />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className='absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full opacity-80'></div>
              <div className='absolute -bottom-6 -left-6 w-8 h-8 bg-green-400 rounded-full opacity-80'></div>
            </div>
          </div>
        </div>
      </section>      {/* Testimonials */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>          <div className='text-center mb-16'>
            <div className='inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4'>
              <Star className='h-4 w-4 mr-2' />
              Cộng đồng trường THPT Nguyễn Du nói gì
            </div>
            <h2 className='text-4xl font-bold text-gray-900 mb-6'>
              Được tin tưởng bởi cộng đồng trường học
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Những phản hồi tích cực từ phụ huynh, giáo viên và đội ngũ y tế trường THPT Nguyễn Du
            </p>
          </div>
          
          <div className='grid md:grid-cols-3 gap-8'>            {[
              {
                content: "Từ khi trường áp dụng hệ thống này, tôi luôn được cập nhật kịp thời về tình trạng sức khỏe của con. Rất yên tâm khi con học tại THPT Nguyễn Du.",
                author: "Chị Nguyễn Thị Lan",
                role: "Phụ huynh học sinh lớp 11A2",
                avatar: "👩‍💼",
                rating: 5
              },
              {
                content: "Hệ thống giúp chúng tôi quản lý sức khỏe của gần 1800 học sinh một cách hiệu quả. Công việc trở nên chuyên nghiệp và có hệ thống hơn rất nhiều.",
                author: "Cô Trần Thị Hương",
                role: "Y tá trưởng trường THPT Nguyễn Du",
                avatar: "👩‍⚕️",
                rating: 5
              },
              {
                content: "Đây là một bước tiến lớn trong việc nâng cao chất lượng chăm sóc sức khỏe học sinh. Báo cáo chi tiết giúp chúng tôi đưa ra những quyết định đúng đắn.",
                author: "Thầy Lê Văn Minh",
                role: "Hiệu trưởng trường THPT Nguyễn Du",
                avatar: "👨‍🏫",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className='bg-gray-50 p-8 rounded-2xl relative'>
                <div className='flex items-center mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className='h-5 w-5 text-yellow-400 fill-current' />
                  ))}
                </div>
                <p className='text-gray-700 mb-6 text-lg leading-relaxed italic'>
                  "{testimonial.content}"
                </p>
                <div className='flex items-center'>
                  <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-2xl'>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className='font-semibold text-gray-900'>{testimonial.author}</div>
                    <div className='text-sm text-gray-600'>{testimonial.role}</div>
                  </div>
                </div>
                <div className='absolute top-6 right-6 text-6xl text-blue-100 font-serif'>"</div>
              </div>
            ))}
          </div>
          
          <div className='text-center mt-12'>
            <button className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold'>
              Xem thêm đánh giá
            </button>
          </div>
        </div>
      </section>

      {/* Knowledge Base & Resources */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <div className='inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4'>
              <BookOpen className='h-4 w-4 mr-2' />
              Kiến thức sức khỏe
            </div>
            <h2 className='text-4xl font-bold text-gray-900 mb-6'>
              Tài liệu và hướng dẫn chăm sóc sức khỏe
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Cập nhật những kiến thức y tế mới nhất và hướng dẫn thực hành tốt nhất 
              cho việc chăm sóc sức khỏe học sinh
            </p>
          </div>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                category: "Phòng ngừa",
                title: "Hướng dẫn vệ sinh cá nhân",
                description: "Các nguyên tắc vệ sinh cơ bản để phòng ngừa bệnh tật trong môi trường học đường và gia đình.",
                gradient: "from-blue-400 to-blue-600",
                readTime: "5 phút đọc"
              },
              {
                category: "Dinh dưỡng",
                title: "Chế độ ăn cân bằng",
                description: "Hướng dẫn chi tiết về chế độ dinh dưỡng phù hợp cho từng độ tuổi học sinh.",
                gradient: "from-green-400 to-green-600",
                readTime: "8 phút đọc"
              },
              {
                category: "Cấp cứu",
                title: "Kỹ năng sơ cứu cơ bản",
                description: "Kiến thức thiết yếu về sơ cứu và xử lý các tình huống khẩn cấp thường gặp.",
                gradient: "from-red-400 to-red-600",
                readTime: "12 phút đọc"
              },
              {
                category: "Tâm lý",
                title: "Sức khỏe tinh thần",
                description: "Cách nhận biết và hỗ trợ các vấn đề sức khỏe tinh thần ở học sinh.",
                gradient: "from-purple-400 to-purple-600",
                readTime: "10 phút đọc"
              },
              {
                category: "Vận động",
                title: "Thể dục thể thao",
                description: "Hướng dẫn các bài tập thể dục phù hợp và an toàn cho học sinh các lứa tuổi.",
                gradient: "from-yellow-400 to-orange-600",
                readTime: "6 phút đọc"
              },
              {
                category: "Môi trường",
                title: "An toàn trường học",
                description: "Các biện pháp đảm bảo môi trường học tập an toàn và lành mạnh.",
                gradient: "from-indigo-400 to-indigo-600",
                readTime: "7 phút đọc"
              }
            ].map((article, index) => (
              <div key={index} className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer'>
                <div className={'h-48 bg-gradient-to-br ' + article.gradient + ' relative'}>
                  <div className='absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300'></div>
                  <div className='absolute top-4 left-4'>
                    <span className='bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium'>
                      {article.category}
                    </span>
                  </div>
                  <div className='absolute bottom-4 right-4 text-white text-sm bg-black bg-opacity-30 px-2 py-1 rounded'>
                    {article.readTime}
                  </div>
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors'>
                    {article.title}
                  </h3>
                  <p className='text-gray-600 mb-4 leading-relaxed'>{article.description}</p>
                  <div className='flex items-center justify-between'>
                    <button className='text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform duration-300'>
                      Đọc thêm
                      <ChevronRight className='h-4 w-4 ml-1' />
                    </button>
                    <div className='flex items-center text-sm text-gray-500'>
                      <BookOpen className='h-4 w-4 mr-1' />
                      Hướng dẫn
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className='text-center mt-12'>
            <button className='bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl'>
              Xem thư viện tài liệu đầy đủ
            </button>
          </div>
        </div>
      </section>      {/* Call to Action */}
      <section className='py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden'>
        {/* Background decoration */}
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -translate-x-20 -translate-y-20'></div>
          <div className='absolute bottom-0 right-0 w-60 h-60 bg-white bg-opacity-5 rounded-full translate-x-20 translate-y-20'></div>
        </div>
        
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10'>          <div className='max-w-4xl mx-auto'>
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
              Hệ thống y tế trường THPT Nguyễn Du
              <span className='block text-blue-200'>chăm sóc sức khỏe toàn diện</span>
            </h2>
            <p className='text-xl text-blue-100 mb-8 leading-relaxed'>
              Với hệ thống quản lý y tế hiện đại, chúng tôi cam kết mang đến dịch vụ chăm sóc 
              sức khỏe tốt nhất cho toàn thể học sinh trường THPT Nguyễn Du.
            </p>
            
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
              <Link
                to='/login'
                className='bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center'
              >
                Đăng nhập ngay
                <ChevronRight className='h-5 w-5 ml-2' />
              </Link>
              <button className='border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold inline-flex items-center justify-center'>
                <PlayCircle className='h-5 w-5 mr-2' />
                Xem demo miễn phí
              </button>
            </div>
              {/* Trust indicators */}
            <div className='grid md:grid-cols-3 gap-8 text-center'>
              <div className='text-white'>
                <div className='text-3xl font-bold mb-2'>1,847</div>
                <div className='text-blue-200'>Học sinh được chăm sóc</div>
              </div>
              <div className='text-white'>
                <div className='text-3xl font-bold mb-2'>45</div>
                <div className='text-blue-200'>Lớp học</div>
              </div>
              <div className='text-white'>
                <div className='text-3xl font-bold mb-2'>7</div>
                <div className='text-blue-200'>Y tá chuyên nghiệp</div>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Footer */}
      <footer id='contact' className='bg-gray-900 text-white py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-4 gap-8 mb-12'>            {/* Company Info */}
            <div className='md:col-span-2'>
              <div className='flex items-center mb-6'>
                <div className='bg-blue-600 p-3 rounded-xl mr-4'>
                  <Stethoscope className='h-8 w-8 text-white' />
                </div>
                <div>
                  <span className='text-2xl font-bold'>Trường THPT Nguyễn Du</span>
                  <div className='text-gray-400'>Hệ thống quản lý y tế</div>
                </div>
              </div>
              <p className='text-gray-400 mb-6 leading-relaxed max-w-md'>
                Hệ thống quản lý sức khỏe hiện đại của trường THPT Nguyễn Du, 
                cam kết mang đến dịch vụ chăm sóc sức khỏe tốt nhất cho học sinh.
              </p>
              <div className='flex space-x-4'>
                <div className='w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition-colors'>
                  <span className='text-sm font-bold'>f</span>
                </div>
                <div className='w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition-colors'>
                  <span className='text-sm font-bold'>t</span>
                </div>
                <div className='w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition-colors'>
                  <span className='text-sm font-bold'>in</span>
                </div>
                <div className='w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition-colors'>
                  <span className='text-sm font-bold'>yt</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className='text-lg font-semibold mb-6'>Sản phẩm</h3>
              <ul className='space-y-3 text-gray-400'>
                <li><a href='#' className='hover:text-white transition-colors'>Quản lý hồ sơ sức khỏe</a></li>
                <li><a href='#' className='hover:text-white transition-colors'>Lập lịch khám bệnh</a></li>
                <li><a href='#' className='hover:text-white transition-colors'>Hệ thống thông báo</a></li>
                <li><a href='#' className='hover:text-white transition-colors'>Báo cáo thống kê</a></li>
                <li><a href='#' className='hover:text-white transition-colors'>Quản lý thuốc</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className='text-lg font-semibold mb-6'>Hỗ trợ</h3>
              <ul className='space-y-3 text-gray-400'>
                <li><a href='#' className='hover:text-white transition-colors'>Trung tâm trợ giúp</a></li>
                <li><a href='#' className='hover:text-white transition-colors'>Hướng dẫn sử dụng</a></li>
                <li><a href='#' className='hover:text-white transition-colors'>Câu hỏi thường gặp</a></li>
                <li><a href='#' className='hover:text-white transition-colors'>Liên hệ hỗ trợ</a></li>
                <li><a href='#' className='hover:text-white transition-colors'>Đào tạo người dùng</a></li>
              </ul>
            </div>
          </div>
            {/* Contact Info */}
          <div className='border-t border-gray-800 pt-8 mb-8'>
            <div className='grid md:grid-cols-3 gap-6'>
              <div className='flex items-center'>
                <div className='bg-blue-600 p-3 rounded-lg mr-4'>
                  <Phone className='h-5 w-5' />
                </div>
                <div>
                  <div className='font-semibold'>Y tế trường</div>
                  <div className='text-gray-400'>(028) 3875 1234</div>
                </div>
              </div>
              <div className='flex items-center'>
                <div className='bg-blue-600 p-3 rounded-lg mr-4'>
                  <Mail className='h-5 w-5' />
                </div>
                <div>
                  <div className='font-semibold'>Email y tế</div>
                  <div className='text-gray-400'>yte@thptnguyendu.edu.vn</div>
                </div>
              </div>
              <div className='flex items-center'>
                <div className='bg-blue-600 p-3 rounded-lg mr-4'>
                  <MapPin className='h-5 w-5' />
                </div>
                <div>
                  <div className='font-semibold'>Địa chỉ trường</div>
                  <div className='text-gray-400'>123 Đường Nguyễn Du, Quận 1, TP.HCM</div>
                </div>
              </div>
            </div>
          </div>
            {/* Bottom Bar */}
          <div className='border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400'>
            <div className='mb-4 md:mb-0'>
              <p>&copy; {new Date().getFullYear()} Trường THPT Nguyễn Du. Tất cả quyền được bảo lưu.</p>
            </div>
            <div className='flex space-x-6 text-sm'>
              <a href='#' className='hover:text-white transition-colors'>Chính sách bảo mật</a>
              <a href='#' className='hover:text-white transition-colors'>Điều khoản sử dụng</a>
              <a href='#' className='hover:text-white transition-colors'>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
