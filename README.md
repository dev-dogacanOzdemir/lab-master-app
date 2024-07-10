<h1 aling="center">labMaster PRO</h1>

**Proje ile ilgili detaylı rapor ProjeRaporu.pdf dosyasında mevcut.**

<p align="center">
  <img width="400" height="400" src="src/main/resources/static/images/labmasterlogo.png">
</p>

- "_labMaster PRO_" adında bir proje geliştirdim. Bu proje, laboratuvar raporlama süreçlerini yönetmek için sistem sunar. _Spring Boot_ kullanılarak geliştirilmiş ve veritabanı işlemleri için _Spring Data JPA_ kullanılmıştır. Ayrıca _Maven_ aracıyla yapılandırılmıştır. Projede, laboratuvar raporlarının tanımlanması, görüntülenmesi, güncellenmesi ve silinmesi gibi işlemleri gerçekleştirmek için gerekli olan temel işlevselliği sağlayacak yapılar bulunmaktadır. Bu yapılar, rapor tanımları için gerekli veri modellemesini, veritabanı etkileşimlerini ve iş mantığını içerir. Ayrıca, raporlara yapılan aramaların ve sıralamaların kolayca yapılabilmesi için uygun yapılar sunulmaktadır. "_labMaster PRO_" projesi, laboratuvar raporlama süreçlerini etkin bir şekilde yönetmek için kullanılabilir.

## İçindekiler

<ul>
    <li><a href="#giris">Giriş</a></li>
    <li><a href="#gereksinimler">Gereksinimler</a></li>
    <li><a href="#kurulum">Kurulum</a></li>
    <li><a href="#uygulamayi-calistirma">Uygulamayı Çalıştırma</a></li>
    <li><a href="#proje-yapisi">Proje Yapısı</a></li>
</ul>

<h2 id="giris">Giriş</h2>

- Bu projeyi geliştirirken MVC (Model-View-Controller) yapısını kullandım. MVC, uygulamayı üç temel bileşene ayırarak modüler bir yapı oluşturur: Model, View ve Controller. _Spring Boot, Spring Data JPA_ ve _Hibernate_ gibi teknolojilerle birlikte kullanıldığında, MVC'nin sağladığı avantajlar daha da belirgin hale gelir.

- Model kısmı, veri modellemesini ve iş mantığını içerir. Bu sayede, bu proje içerisinde laboratuvar raporlarının tanımlanması, güncellenmesi ve silinmesi gibi işlemler kolaylıkla gerçekleştirilebilir. _Spring Data JPA_ ve _Hibernate_ gibi ORM (Object-Relational Mapping) araçları, veritabanı işlemlerini basitleştirir ve veri modellemesini destekler, bu da geliştirme sürecini hızlandırır.

- View kısmı, kullanıcı arayüzünü temsil eder. MVC yapısı sayesinde, kullanıcı arayüzü ve iş mantığı birbirinden ayrılarak daha modüler hale gelir. Bu durum ise projelerde kullanıcı arayüzünün esnek ve kolayca değiştirilebilir olmasını sağlar.

- Controller kısmı, istemci isteklerini alır, iş mantığını yürütür ve sonuçları kullanıcı arayüzüne aktarır. Spring Boot'un sunduğu kolaylık ve esneklik sayesinde, istekleri işleyen ve doğru controller'a yönlendiren bir yapı oluşturulabilir. Bu da uygulamanın genel performansını ve yönetilebilirliğini artırır.

- Sonuç olarak, MVC yapısı "labMaster PRO" gibi laboratuvar raporlama sistemleri için ideal bir seçimdir. _Spring Boot, Spring Data JPA_ ve _Hibernate_ gibi teknolojilerle bir araya geldiğinde, geliştirme süreci daha kolay hale gelir ve uygulama daha esnek, ölçeklenebilir ve bakımı kolay bir yapıya sahip olur.

<h2 id="gereksinimler">Gereksinimler</h2>

- **Java Development Kit (JDK)**: 21
- **MySQL**: 8.0 veya üstü
- **Apache Maven**: 3.9.0 veya üstü
- **Node.js
  
<h2 id="kurulum">Kurulum</h2>

1. Java, MySQL, Node.js ve Maven'ın yüklü olduğundan emin olun:
    ```bash
    java -version
    mvn -version
    mysql --version
    ```
2. Bir dosya olarak istediğiniz yere kopyalayın.
  
3.
   **Windows :** 
   
   - labMasterPRO dosyasını çalıştırdığınızda gerekli yapılandırmaları yapacaktır. 

   **Linux :**
  
   - Terminal üzerinden ilgili dosyaya gelip
   ```bash
   chmod +x run_app.sh
   chmod +x create_db.sh
   ```
   kodlarını yazın.
   
   

<h2 id="uygulamayi-calistirma">Uygulamayı Çalıştırma</h2>

1. **Windows :**
 - labMasterPRO kısayolunu çalıştırın.
   
   **Linux :**
 - labMasterPRO(Linux).sh scriptini çalıştırın. 

2. Tarayıcınızda `http://localhost:8080` adresine gidin.

<h2 id="proje-yapisi">Proje Yapısı</h2>

```plaintext
lab-master-v1.0
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── doa
│   │   │           └── labmasterv10
│   │   │               └── Config
│   │   │                   └── ResourceNotFoundException.java
│   │   │                   └── SecurityConfig.java
│   │   │               └── Controller
│   │   │                   └── HomeController.java
│   │   │                   └── LaborantController.java
│   │   │                   └── ReportController.java
│   │   │               └── Entities
│   │   │                   └── Laborant.java
│   │   │                   └── Report.java
│   │   │               └── Repository
│   │   │                   └── LaborantRepository.java
│   │   │                   └── ReportRepository.java
│   │   │               └── Service
│   │   │                   └── LaborantService.java
│   │   │                   └── ReportService.java
│   │   │               ├── Application.java
│   │   ├── resources
│   │       ├── application.properties
│   │       ├── static
│   │           └── images
│   │       ├── templates
│   │           └── createLaborant.html
│   │           └── createReport.html
│   │           └── editLaborant.html
│   │           └── editReport.html
│   │           └── index.html
│   │           └── laborantDetails.html
│   │           └── laborants.html
│   │           └── reportDetails.html
│   │           └── reports.html
│   │       ├── uploads
│   │           └──**Hasta dosyalarının yüklendiği ve tutulduğu dizin**
│   └── test
│       ├── java
│       │   └── com
│       │       └── example
│       │           └── demo
│       │               └── ApplicationTests.java
├── mvnw
├── mvnw.cmd
├── pom.xml
├── Dockerfile
└── README.md

```
**Tüm dosyaların ilgili kodlarının açıklamaları yorum satırı olarak içerisinde bulunmaktadır.**


- `src/main/java/com/doa/labmasterv10/Config`: Proje yapılandırması için gerekli sınıfları içerir.
- `src/main/java/com/doa/labmasterv10/Controller`: Gelen istekleri işler ve uygun iş mantığı kodunu çalıştırır. 
- `src/main/java/com/doa/labmasterv10/Entities`: Veritabanı tablolarını ve ilişkilerini temsil eden Java sınıflarını içerir.
- `src/main/java/com/doa/labmasterv10/Repository`: Veritabanı erişim işlemlerini gerçekleştiren repository sınıflarını içerir.
- `src/main/java/com/doa/labmasterv10/Service`: İş mantığının bulunduğu yerdir. Burada, işlemlerin gerçekleştirilmesi için gerekli olan farklı bileşenler ve servisler bir araya getirilir.
- `src/main/java/com/doa/labmasterv10`: Uygulamanın giriş noktası olan Application sınıfını içerir.
- `src/main/resources`: Uygulama yapılandırma dosyalarını içerir.
- `src/main/resources/static`: Statik dosyaları içerir.
- `src/main/resources/templates`: Thymeleaf şablon dosyalarını içerir.
- `src/test/java/com/example/demo`: Test sınıflarını içerir.

##
