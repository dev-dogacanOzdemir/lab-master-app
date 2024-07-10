<h1 aling="center">labMaster PRO</h1>

<p align="center">
  <img width="400" height="400" src="lab-master-frontend/public/labmasterlogo.ico">
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

- Model kısmı, veri modellemesini ve iş mantığını içerir. Bu sayede, bu proje içerisinde laboratuvar raporlarının tanımlanması, güncellenmesi ve silinmesi gibi işlemler kolaylıkla gerçekleştirilebilir. _Spring Data JPA_ gibi ORM (Object-Relational Mapping) araçları, veritabanı işlemlerini basitleştirir ve veri modellemesini destekler, bu da geliştirme sürecini hızlandırır.

- lab-master-frontend, React, Redux Toolkit ve Mantine UI kullanılarak geliştirilmiş bir yapı sunar ve arayüz bileşenleri barındırır.

- Controller kısmı, istemci isteklerini alır, iş mantığını yürütür ve sonuçları kullanıcı arayüzüne aktarır. Spring Boot'un sunduğu kolaylık ve esneklik sayesinde, istekleri işleyen ve doğru controller'a yönlendiren bir yapı oluşturulabilir. Bu da uygulamanın genel performansını ve yönetilebilirliğini artırır.

- Sonuç olarak, REST yapısı "labMaster PRO" gibi laboratuvar raporlama sistemleri için ideal bir seçimdir. _Spring Boot, Spring Data JPA_ gibi teknolojilerle bir araya geldiğinde, geliştirme süreci daha kolay hale gelir ve uygulama daha esnek, ölçeklenebilir ve bakımı kolay bir yapıya sahip olur.

<h2 id="gereksinimler">Gereksinimler</h2>

- **Java Development Kit (JDK)**: 21
- **MySQL**: 8.0 veya üstü
- **Apache Maven**: 3.9.0 veya üstü
- **Node.js: 20.13.1 ve üstü
  
<h2 id="kurulum">Kurulum</h2>

1. Java, MySQL, Node.js ve Maven'ın yüklü olduğundan emin olun:
    ```bash
    java -version
    mvn -version
    mysql --version
    node -v
    ```
2. Bir dosya olarak istediğiniz yere kopyalayın.
  
3.
   **Windows :** 
   
   - labMasterPRO dosyasını çalıştırdığınızda gerekli yapılandırmaları yapacaktır. 

   **Linux :**
  
   - Terminal üzerinden ilgili dosyaya gelip
   ```bash
   chmod +x start-all-app-linux.sh
   ```
   kodlarını yazın.
   
   

<h2 id="uygulamayi-calistirma">Uygulamayı Çalıştırma</h2>

1. **Windows :**
 - labMasterPRO kısayolunu çalıştırın.
   
   **Linux :**
 - labMasterPRO(Linux).sh scriptini çalıştırın. 

2. Tarayıcınızda `http://localhost:5173` adresine gidin.

<h2 id="proje-yapisi">Proje Yapısı</h2>

```plaintext
lab-master-backend
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── doa
│   │   │           └── lab-master-backend
│   │   │               └── Config
│   │   │                   └── CorsConfig.java //İlgili isteklerin React uygulaması tarafına gönderilmesi ve alınmasındaki isteklerin sağlanmasını sağlaya yapıdır.
│   │   │               └── Controller
│   │   │                   └── LaborantController.java
│   │   │                   └── LabReportController.java
│   │   │               └── Entities
│   │   │                   └── Laborant.java
│   │   │                   └── LabReport.java
│   │   │               └── Repository
│   │   │                   └── LaborantRepository.java
│   │   │                   └── LabReportRepository.java
│   │   │               └── Service
│   │   │                   └── LaborantService.java
│   │   │                   └── LabReportService.java
│   │   │               ├── LabMasterBackendApplication.java
│   │   ├── resources
│   │       ├── application.properties
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


- `src/main/java/com/doa/lab-master-backend/Config`: Proje yapılandırması için gerekli sınıfları içerir.
- `src/main/java/com/doa/lab-master-backend/Controller`: Gelen istekleri işler ve uygun iş mantığı kodunu çalıştırır. 
- `src/main/java/com/doa/lab-master-backend/Entities`: Veritabanı tablolarını ve ilişkilerini temsil eden Java sınıflarını içerir.
- `src/main/java/com/doa/lab-master-backend/Repository`: Veritabanı erişim işlemlerini gerçekleştiren repository sınıflarını içerir.
- `src/main/java/com/doa/lab-master-backend/Service`: İş mantığının bulunduğu yerdir. Burada, işlemlerin gerçekleştirilmesi için gerekli olan farklı bileşenler ve servisler bir araya getirilir.
- `src/main/java/com/doa/lab-master-backend`: Uygulamanın giriş noktası olan Application sınıfını içerir.
- `src/main/resources`: Uygulama yapılandırma dosyalarını içerir.
- `src/test/java/com/example/demo`: Test sınıflarını içerir.

##

```plaintext
lab-master-frontend
├── node_modules //package.json dosyasındaki gerekli kurulumların sağlandığı dosyadır.
├── public
│   └── labmasterlogo.ico
├── src
│   └── App.css
│   └── App.tsx
│   └── HeaderMenu.module.css
│   └── HeaderMenu.tsx
│   └── http-common.tsx
│   └── index.css
│   └── main.tsx
│   └── postcss.config.cjs
│   └── store.tsx
│   ├── assets
│   │   └── home.png //Anasayfadaki görüntü
│   ├── components
│   │   └── AddLaborantForm.tsx
│   │   └── AddLabRaportForm.tsx
│   │   └── CardGradient.tsx
│   │   └── LaborantDetails.tsx
│   │   └── LaborantList.tsx
│   │   └── LabReportDetails.tsx
│   │   └── LabReportList.tsx
│   │   └── UpdateLaborantForm.tsx
│   │   └── UpdateLabReportForm.tsx
│   ├── css
│   │   └── CartGradient.module.css //CartGradient css yapılandırmasıdır.
│   │   └── TableSort.module.css //Listeleme işlemlerinde kullanılan Mantine UI yapılandırmasının css yapılandırmasıdır.
│   ├── pages
│   │   └── AddLaborant.tsx
│   │   └── AddReport.tsx
│   │   └── AllLaborants.tsx
│   │   └── AllReports.tsx
│   │   └── Home.tsx
└── index.html
└── package.json

```
**Tüm dosyaların ilgili kodlarının açıklamaları yorum satırı olarak içerisinde bulunmaktadır.**


- `lab-master-frontend/node-modules`: package.json dosyasındaki gerekli kurulumların sağlandığı dosyadır.
- `lab-master-frontend/public`: Genel proje içerisinden erişilebilecek yapıları içerir.
- `lab-master-frontend/src/App.css`: Genel projenin stil yapılandırmasını içerir.
- `lab-master-frontend/src/App.tsx`: Genel projenin çalıştığı React sayfasıdır.
- `lab-master-frontend/src/HeaderMenu.module.css`: Navigation Bar yapısının stil ayarlamalarını içerir.
- `lab-master-frontend/src/HeaderMenu.tsx`: Navigation Bar yapısını içerir.
- `lab-master-frontend/src/http-common.tsx`: Gerekli API yapılandırmasını içerir.
- `lab-master-frontend/src/main.tsx`: Ana React uygulamasının çağırıldığı en geniş yapıdır.
- `lab-master-frontend/src/postcss.config.cjs`: PostCSS modülünün ayarlamalarının yapıldığı yapıdır.
- `lab-master-frontend/src/store.tsx`: Redux Tool Kit için gerekli store yapılanmasının olduğu yapıdır.
- `lab-master-frontend/components/AddLaborantForm.tsx` : Laborant ekleme formunun bulunduğu görünüm ve API isteklerinin sağlandığı yapıdır.
- `lab-master-frontend/components/AddLabRaport.tsx` : Rapor ekleme formunun bulunduğu görünüm ve API isteklerinin sağlandığı yapıdır.
- `lab-master-frontend/components/CartGradient.tsx` : Ana sayfadaki yönlendirmeye yarayan büyük butonların tanımlandığı yapıdır.
- `lab-master-frontend/components/LaborantDetails.tsx` : Laborant detaylarının bulunduğu görünüm ve API isteklerinin sağlandığı yapıdır.
- `lab-master-frontend/components/LaborantList.tsx` : Laborant listelemelerinin bulunduğu görünüm ve API isteklerinin sağlandığı yapıdır.
- `lab-master-frontend/components/LabReportDetails.tsx` : Rapor detaylarının bulunduğu görünüm ve API isteklerinin sağlandığı yapıdır.
- `lab-master-frontend/components/LabReportDetails.tsx` : Rapor listelemelerinin bulunduğu görünüm ve API isteklerinin sağlandığı yapıdır.
- `lab-master-frontend/components/UpdateLaborantForm.tsx` : Laborant güncellemelerinin bulunduğu görünüm ve API isteklerinin sağlandığı yapıdır.
- `lab-master-frontend/components/UpdateLabReportForm.tsx` : Laborant güncellemelerinin bulunduğu görünüm ve API isteklerinin sağlandığı yapıdır.
- `lab-master-frontend/pages` : Yönlendirilmiş sayfalarda gerekli yapıların çağırılmasının sağlandığı yerlerdir. (Düzgün bir yapı oluşması amacıyla oluşturulmuştur.)
##
