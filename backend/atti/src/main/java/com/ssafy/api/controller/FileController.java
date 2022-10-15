//package com.ssafy.api.controller;
//
//import java.io.File;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.ssafy.api.request.FileDto;
//import com.ssafy.api.service.FileService;
//import com.ssafy.common.util.MD5Generator;
//
//@Controller
//@RequestMapping("/file")
//public class FileController {
//	
//	@Autowired
//	FileService fileService;
//	
//	@PostMapping("/post")
////    public String write(@RequestParam("file") MultipartFile files, BoardDto boardDto) {
//		public String write(@RequestParam("file") MultipartFile files) {
//        try {
//            String origFilename = files.getOriginalFilename();
//            String filename = new MD5Generator(origFilename).toString();
//            /* 실행되는 위치의 'files' 폴더에 파일이 저장됩니다. */
//            String savePath = System.getProperty("user.dir") + "\\files";
//            /* 파일이 저장되는 폴더가 없으면 폴더를 생성합니다. */
//            if (!new File(savePath).exists()) {
//                try{
//                    new File(savePath).mkdir();
//                }
//                catch(Exception e){
//                    e.getStackTrace();
//                }
//            }
//            String filePath = savePath + "\\" + filename;
//            files.transferTo(new File(filePath));
//
//            FileDto fileDto = new FileDto();
//            fileDto.setFileOrigin(origFilename);
//            fileDto.setFileNew(filename);
//            fileDto.setFileFolder(filePath);
//
//            Long fileId = fileService.saveFile(fileDto);
////            boardDto.setFileId(fileId);
////            boardService.savePost(boardDto);
//        } catch(Exception e) {
//            e.printStackTrace();
//        }
//        return "redirect:/";
//    }
//	
//	@GetMapping("/download/{fileId}")
//	public ResponseEntity<Resource> fileDownload(@PathVariable("fileId") Long fileId) throws IOException {
//	    FileDto fileDto = fileService.getFile(fileId);
//	    Path path = Paths.get(fileDto.getFilePath());
//	    Resource resource = new InputStreamResource(Files.newInputStream(path));
//	    return ResponseEntity.ok()
//	            .contentType(MediaType.parseMediaType("application/octet-stream"))
//	            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDto.getOrigFilename() + "\"")
//	            .body(resource);
//	}
//}
