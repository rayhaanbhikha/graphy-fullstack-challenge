import { AnnotationService, DEFAULT_ID } from '../../../Annotations.service';
import { AnnotationStates } from '../../../enums';
import { useAnnotations } from '../useAnnotations';
import { renderHook, act } from '@testing-library/react-hooks'

jest.spyOn(console, 'error').mockImplementation();

describe('UseAnnotations hook', () => {
  const annotationService = ({
    getAll: jest.fn().mockResolvedValue([
      { _id: 'some-id-2', text: 'hello world 2', coord: { x: 2, y: 5 }, state: AnnotationStates.OPEN }
    ]),
    save: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    create: jest.fn()
  } as unknown) as AnnotationService;

  beforeEach(jest.clearAllMocks)

  describe('init method', () => {

    it("should fetch all annotations", async () => {
      const { result } = renderHook(() => useAnnotations(annotationService, []));
      await act(async () => {
        await result.current.init();
        expect(annotationService.getAll).toHaveBeenCalled();
      })
    })
    
    it("should handler error correctly", async () => {
      annotationService.getAll = jest.fn().mockRejectedValue("some-err");
      const { result } = renderHook(() => useAnnotations(annotationService, []));
      await act(async () => {
        await result.current.init();
        expect(result.current.errorMessage).toEqual("Error retrieving annotations");
      })
    })
  })

  describe('save method', () => {
    it("should call update method if annotation has id",  async () => {
      const { result } = renderHook(() => useAnnotations(annotationService, []));
      const annotationToSave = { _id: 'some-id-2', text: 'new message', coord: { x: 2, y: 5 }, state: AnnotationStates.OPEN }
      await act(async () => {
        await result.current.save(annotationToSave);
        expect(annotationService.update).toHaveBeenCalledWith(annotationToSave);
      })
    })

    it("should call save method if annotation has default id", async () => {
      const annotationToSave = { _id: DEFAULT_ID, text: 'new message', coord: { x: 2, y: 5 }, state: AnnotationStates.OPEN }
      const savedAnnotationResponse = { ...annotationToSave, _id: 'mock-id'}
      annotationService.save = jest.fn().mockResolvedValue(savedAnnotationResponse)
      const { result } = renderHook(() => useAnnotations(annotationService, [annotationToSave]));
      await act(async () => {
        await result.current.save(annotationToSave);
        expect(annotationService.save).toHaveBeenCalledWith(annotationToSave);
        expect(result.current.value).toEqual([savedAnnotationResponse]);
      })
    })

    it("should handle error correctly", async () => {
      const annotationToSave = { _id: DEFAULT_ID, text: 'new message', coord: { x: 2, y: 5 }, state: AnnotationStates.OPEN }
      annotationService.save = jest.fn().mockRejectedValue("some-err");
      const { result } = renderHook(() => useAnnotations(annotationService, []));
      await act(async () => {
        await result.current.save(annotationToSave);
        expect(result.current.errorMessage).toEqual("Error saving annotation");
      })
    })
  })

  describe('remove method', () => {
    const annotationToDeleteWithDefaultId = { _id: DEFAULT_ID, text: 'new message', coord: { x: 2, y: 5 }, state: AnnotationStates.OPEN }
    const annotationToDelete = { ...annotationToDeleteWithDefaultId, _id: 'some-id'}


    it("should call remove method if annotation doesn't have default id", async () => {
      const { result } = renderHook(() => useAnnotations(annotationService, [annotationToDelete]));
      await act(async () => {
        await result.current.remove(annotationToDelete);
        expect(annotationService.remove).toHaveBeenCalledWith(annotationToDelete);
        expect(result.current.value).toEqual([]);
      })
    })

    it("should not call remove method if annotation default id", async () => {
      const { result } = renderHook(() => useAnnotations(annotationService, [annotationToDelete, annotationToDeleteWithDefaultId]));
      await act(async () => {
        await result.current.remove(annotationToDeleteWithDefaultId);
        expect(annotationService.remove).not.toHaveBeenCalled();
        expect(result.current.value).toEqual([annotationToDelete]);
      })
    })

    it("should handle error correctly", async () => {
      annotationService.remove = jest.fn().mockRejectedValue("some-err");
      const { result } = renderHook(() => useAnnotations(annotationService, []));
      await act(async () => {
        await result.current.remove(annotationToDelete);
        expect(result.current.errorMessage).toEqual("Error deleting annotation");
      })
    })
  })


  it("should create annotations", async () => {
    const createdAnnotation = { foo: 'bar' };
    annotationService.create = jest.fn().mockReturnValue(createdAnnotation)
    const { result } = renderHook(() => useAnnotations(annotationService, []));
    await act(async () => {
      await result.current.create({ x: 4, y: 3});
      expect(result.current.value).toEqual([createdAnnotation]);
    })
  })
})
